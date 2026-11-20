#!/usr/bin/env python3
"""Make a 1600x900 blog cover (JPG) for ms.primeznews.com.

Usage:
  python3 tools/blog-cover/make_cover.py \
    --title "7 SaaS Dashboard Design Mistakes" --highlight "Dashboard Design" \
    --kicker "UI/UX Guide" --subtitle "And how to fix them" \
    --point "Too many metrics" --point "No visual order" --point "Blank empty states" \
    --scene dashboard --out assets/images/blog/<slug>.jpg

Scenes: dashboard, mobile, website, checklist, compare
Needs Google Chrome (headless) and Pillow.
"""
import argparse, html, os, shutil, subprocess, sys, tempfile
from PIL import Image

W, H = 1600, 900

SCENES = {
"dashboard": """
<div class="win">
  <div class="bar"><i></i><i></i><i></i><b></b></div>
  <div class="dash">
    <div class="side"><s class="on"></s><s></s><s></s><s></s><s></s></div>
    <div class="main">
      <div class="kpis">
        <div class="kpi hero"><small>Active users</small><strong>12.4k</strong><em>&#9650; 8%</em></div>
        <div class="kpi"><small>MRR</small><strong>$48k</strong><em>&#9650; 4%</em></div>
        <div class="kpi"><small>Churn</small><strong>2.1%</strong><em class="dn">&#9660; 0.3</em></div>
      </div>
      <div class="chart">
        <svg viewBox="0 0 400 150" preserveAspectRatio="none">
          <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b5cf6" stop-opacity=".35"/><stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/></linearGradient></defs>
          <path d="M0 120 L50 105 L100 112 L150 80 L200 88 L250 55 L300 62 L350 30 L400 38 L400 150 L0 150Z" fill="url(#g)"/>
          <path d="M0 120 L50 105 L100 112 L150 80 L200 88 L250 55 L300 62 L350 30 L400 38" fill="none" stroke="#7c3aed" stroke-width="4" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="bars"><span style="height:45%"></span><span style="height:70%"></span><span style="height:55%"></span><span style="height:90%"></span><span style="height:65%"></span><span style="height:80%"></span></div>
    </div>
  </div>
</div>""",
"mobile": """
<div class="phone"><div class="notch"></div>
  <div class="ph-head"><b>Hi, there &#128075;</b><small>Welcome back</small></div>
  <div class="ph-card"><small>Balance</small><strong>$3,250</strong></div>
  <div class="ph-icons"><i></i><i></i><i></i><i></i></div>
  <div class="ph-row"></div><div class="ph-row"></div><div class="ph-row short"></div>
  <div class="ph-btn">Continue</div>
</div>
<div class="phone back"><div class="notch"></div><div class="ph-card alt"></div><div class="ph-row"></div><div class="ph-row"></div><div class="ph-row short"></div></div>""",
"website": """
<div class="win">
  <div class="bar"><i></i><i></i><i></i><b></b></div>
  <div class="site">
    <div class="nav"><span class="logo"></span><span></span><span></span><span></span><span class="cta"></span></div>
    <div class="heroblk"><div><h4></h4><h4 class="s"></h4><p></p><p class="s"></p><span class="btn">Get started</span></div><div class="img"></div></div>
    <div class="cards"><div></div><div></div><div></div></div>
  </div>
</div>""",
"checklist": """
<div class="card-list">
  <div class="li ok"><span>&#10003;</span><b></b></div>
  <div class="li ok"><span>&#10003;</span><b class="m"></b></div>
  <div class="li ok"><span>&#10003;</span><b></b></div>
  <div class="li"><span></span><b class="s"></b></div>
  <div class="li"><span></span><b class="m"></b></div>
  <div class="progress"><i style="width:60%"></i></div>
</div>""",
"compare": """
<div class="cmp">
  <div class="col bad"><div class="top"></div><div class="blk"></div><div class="ln"></div><div class="ln s"></div><div class="tag">Before</div></div>
  <div class="vs">VS</div>
  <div class="col good"><div class="top"></div><div class="blk"></div><div class="ln"></div><div class="ln s"></div><div class="tag">After</div></div>
</div>""",
}

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1600px;height:900px;overflow:hidden}
body{font-family:Poppins,Inter,sans-serif;color:#1e1035;position:relative;
 background:radial-gradient(1200px 700px at 100% 0%,#3b0f7a 0%,#5b21b6 35%,rgba(91,33,182,0) 70%),
 radial-gradient(900px 600px at 0% 100%,#efe7ff 0%,rgba(239,231,255,0) 70%),
 linear-gradient(120deg,#fbf9ff 0%,#f3ecff 45%,#d9c8fb 62%,#6d28d9 100%)}
.dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.18) 1.5px,transparent 1.5px);background-size:28px 28px;
 -webkit-mask-image:linear-gradient(90deg,transparent 45%,#000 75%)}
.left{position:absolute;left:96px;top:110px;width:760px}
.kicker{display:flex;align-items:center;gap:16px;font-weight:600;letter-spacing:.32em;text-transform:uppercase;font-size:20px;color:#5b21b6}
.kicker:before{content:"";width:56px;height:3px;background:#7c3aed;border-radius:3px}
h1{margin-top:26px;font-weight:700;font-size:var(--fs,78px);line-height:1.08;letter-spacing:-.02em;color:#1a0b3b}
h1 mark{background:none;color:transparent;background-image:linear-gradient(90deg,#7c3aed,#a855f7);-webkit-background-clip:text;background-clip:text}
.sub{margin-top:22px;font-size:30px;font-weight:500;color:#4c3a73}
.points{margin-top:38px;display:flex;flex-direction:column;gap:14px}
.pt{display:flex;align-items:center;gap:16px;font-size:24px;font-weight:500;color:#2e1b55}
.pt i{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;font-style:normal;font-size:18px;display:grid;place-items:center;box-shadow:0 8px 18px -6px rgba(124,58,237,.6)}
.foot{position:absolute;left:96px;bottom:56px;display:flex;align-items:center;gap:16px;font-size:21px;color:#4c3a73}
.foot .mk{width:46px;height:46px;border-radius:14px;background:linear-gradient(135deg,#6d28d9,#a855f7);color:#fff;font-weight:700;display:grid;place-items:center;font-size:18px}
.foot b{color:#1a0b3b}
.right{position:absolute;right:70px;top:150px;width:640px;height:600px}
/* window */
.win{position:absolute;inset:0 0 auto 0;height:560px;background:#fff;border-radius:26px;box-shadow:0 60px 120px -40px rgba(30,6,80,.65),0 0 0 1px rgba(255,255,255,.4);overflow:hidden;transform:perspective(1800px) rotateY(-10deg) rotateX(4deg)}
.bar{height:46px;background:#f4f0fc;display:flex;align-items:center;gap:9px;padding:0 20px}
.bar i{width:13px;height:13px;border-radius:50%;background:#d6c9f3}.bar b{margin-left:18px;height:18px;width:260px;border-radius:9px;background:#e7dffa}
.dash{display:flex;height:514px}
.side{width:84px;background:#1e1035;padding:26px 0;display:flex;flex-direction:column;align-items:center;gap:20px}
.side s{width:34px;height:34px;border-radius:10px;background:#3a2766}.side s.on{background:#8b5cf6}
.main{flex:1;padding:26px;display:flex;flex-direction:column;gap:18px}
.kpis{display:flex;gap:14px}
.kpi{flex:1;background:#faf7ff;border:1px solid #ece4fb;border-radius:16px;padding:14px 16px}
.kpi small{display:block;font-size:13px;color:#7a6a99}.kpi strong{display:block;font-size:30px;font-weight:700;margin-top:2px}.kpi em{font-style:normal;font-size:13px;font-weight:600;color:#16a34a}.kpi em.dn{color:#dc2626}
.kpi.hero{background:linear-gradient(135deg,#7c3aed,#a855f7);border:0;color:#fff}.kpi.hero small,.kpi.hero em{color:#efe6ff}
.chart{height:170px;background:#faf7ff;border-radius:16px;padding:10px}.chart svg{width:100%;height:100%}
.bars{flex:1;display:flex;align-items:flex-end;gap:14px;padding:0 6px}.bars span{flex:1;border-radius:8px 8px 3px 3px;background:#ddd0fb}.bars span:nth-child(4){background:#7c3aed}
/* phone */
.phone{position:absolute;right:120px;top:0;width:290px;height:580px;background:#fff;border-radius:44px;border:10px solid #1e1035;box-shadow:0 60px 120px -40px rgba(30,6,80,.7);padding:46px 20px 20px;display:flex;flex-direction:column;gap:14px;z-index:2}
.phone.back{right:-10px;top:60px;transform:rotate(8deg) scale(.88);z-index:1;opacity:.9}
.notch{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:90px;height:22px;border-radius:12px;background:#1e1035}
.ph-head b{display:block;font-size:20px}.ph-head small{color:#7a6a99;font-size:13px}
.ph-card{height:110px;border-radius:20px;background:linear-gradient(135deg,#6d28d9,#a855f7);color:#fff;padding:18px}.ph-card small{font-size:13px;opacity:.85}.ph-card strong{display:block;font-size:32px;font-weight:700}
.ph-card.alt{background:linear-gradient(135deg,#c4b5fd,#ede9fe)}
.ph-icons{display:flex;justify-content:space-between}.ph-icons i{width:48px;height:48px;border-radius:14px;background:#f1eafe}
.ph-row{height:48px;border-radius:14px;background:#f6f2fe}.ph-row.short{width:70%}
.ph-btn{margin-top:auto;height:50px;border-radius:25px;background:#1e1035;color:#fff;display:grid;place-items:center;font-weight:600;font-size:16px}
/* website */
.site{padding:22px 26px}
.nav{display:flex;align-items:center;gap:22px}.nav span{height:12px;width:60px;border-radius:6px;background:#e7dffa}.nav .logo{width:90px;height:22px;background:#1e1035}.nav .cta{margin-left:auto;width:110px;height:34px;border-radius:17px;background:#7c3aed}
.heroblk{display:flex;gap:24px;margin-top:34px}.heroblk>div:first-child{flex:1}
.heroblk h4{height:28px;border-radius:8px;background:#1e1035;margin-bottom:12px}.heroblk h4.s{width:70%}
.heroblk p{height:12px;border-radius:6px;background:#e3daf7;margin-top:16px}.heroblk p.s{width:60%;margin-top:10px}
.btn{display:inline-block;margin-top:24px;padding:12px 24px;border-radius:24px;background:#7c3aed;color:#fff;font-weight:600;font-size:15px}
.heroblk .img{width:250px;height:200px;border-radius:20px;background:linear-gradient(135deg,#c4b5fd,#7c3aed)}
.cards{display:flex;gap:16px;margin-top:30px}.cards div{flex:1;height:140px;border-radius:16px;background:#f6f2fe;border:1px solid #ece4fb}
/* checklist */
.card-list{position:absolute;inset:20px 40px auto 40px;background:#fff;border-radius:28px;padding:36px;box-shadow:0 60px 120px -40px rgba(30,6,80,.65);display:flex;flex-direction:column;gap:20px;transform:rotate(-3deg)}
.li{display:flex;align-items:center;gap:18px}.li span{width:44px;height:44px;border-radius:12px;border:3px solid #d6c9f3;display:grid;place-items:center;color:#fff;font-weight:700;font-size:22px}
.li.ok span{background:#7c3aed;border-color:#7c3aed}.li b{height:18px;flex:1;border-radius:9px;background:#e7dffa}.li b.m{flex:.7}.li b.s{flex:.5}
.progress{height:16px;border-radius:8px;background:#f1eafe;margin-top:8px}.progress i{display:block;height:100%;border-radius:8px;background:linear-gradient(90deg,#7c3aed,#a855f7)}
/* compare */
.cmp{position:absolute;inset:30px 0 auto 0;display:flex;align-items:center;gap:18px}
.col{flex:1;height:440px;border-radius:24px;background:#fff;padding:24px;display:flex;flex-direction:column;gap:14px;box-shadow:0 50px 100px -40px rgba(30,6,80,.6);position:relative}
.col .top{height:24px;border-radius:8px;background:#e5e1ec}.col .blk{height:150px;border-radius:16px;background:#eeeaf3}.col .ln{height:14px;border-radius:7px;background:#e5e1ec}.col .ln.s{width:60%}
.col.good .top{background:#1e1035}.col.good .blk{background:linear-gradient(135deg,#c4b5fd,#7c3aed)}.col.good .ln{background:#e3daf7}
.col.bad{filter:saturate(.2);opacity:.85}
.tag{position:absolute;bottom:22px;left:24px;padding:8px 18px;border-radius:20px;font-weight:600;font-size:16px;background:#f1eafe;color:#5b21b6}
.col.bad .tag{background:#eee;color:#666}
.vs{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#6d28d9,#a855f7);color:#fff;font-weight:700;font-size:24px;display:grid;place-items:center;flex:none;box-shadow:0 14px 30px -10px rgba(91,33,182,.8)}
"""

def build_html(a):
    title = html.escape(a.title)
    if a.highlight and a.highlight in a.title:
        h = html.escape(a.highlight)
        title = title.replace(h, f"<mark>{h}</mark>", 1)
    n = len(a.title)
    fs = 84 if n <= 28 else 76 if n <= 40 else 66 if n <= 55 else 58
    pts = "".join(f'<div class="pt"><i>&#10003;</i>{html.escape(p)}</div>' for p in a.point[:3])
    sub = f'<p class="sub">{html.escape(a.subtitle)}</p>' if a.subtitle else ""
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{CSS}</style></head>
<body><div class="dots"></div>
<div class="left"><div class="kicker">{html.escape(a.kicker)}</div><h1 style="--fs:{fs}px">{title}</h1>{sub}<div class="points">{pts}</div></div>
<div class="right">{SCENES[a.scene]}</div>
<div class="foot"><span class="mk">MS</span><span><b>Mangat Singh</b> &middot; UI/UX &amp; Product Designer &middot; ms.primeznews.com</span></div>
</body></html>"""

def find_chrome():
    for c in ("google-chrome", "chromium", "chromium-browser", "google-chrome-stable"):
        p = shutil.which(c)
        if p:
            return p
    sys.exit("Chrome/Chromium not found")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--title", required=True)
    ap.add_argument("--highlight", default="")
    ap.add_argument("--kicker", default="UI/UX Guide")
    ap.add_argument("--subtitle", default="")
    ap.add_argument("--point", action="append", default=[])
    ap.add_argument("--scene", choices=sorted(SCENES), default="dashboard")
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    with tempfile.TemporaryDirectory() as d:
        page = os.path.join(d, "cover.html"); png = os.path.join(d, "cover.png")
        open(page, "w", encoding="utf-8").write(build_html(a))
        subprocess.run([find_chrome(), "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
                        "--force-device-scale-factor=1", f"--window-size={W},{H}", f"--screenshot={png}",
                        "file://" + page], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)
        img = Image.open(png).convert("RGB")
        if img.size != (W, H):
            img = img.crop((0, 0, W, H))
        os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
        img.save(a.out, "JPEG", quality=86, optimize=True, progressive=True)
    print(a.out, os.path.getsize(a.out) // 1024, "KB")

if __name__ == "__main__":
    main()
