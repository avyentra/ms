# Blog cover generator

Har blog ke liye 1600 x 900 banner (JPG) banata hai, website ke purple style mein.

```bash
python3 tools/blog-cover/make_cover.py \
  --title "7 SaaS Dashboard Design Mistakes" \
  --highlight "Dashboard Design" \
  --kicker "UI/UX Guide" \
  --subtitle "And how to fix them" \
  --point "Too many metrics" --point "No visual order" --point "Blank empty states" \
  --scene dashboard \
  --out assets/images/blog/<slug>.jpg
```

- `--highlight`: title ka jo hissa purple mein dikhana hai (title mein exact hona chahiye)
- `--point`: 0 se 3 chhote points (har ek 2–5 words)
- `--scene`: right side ka illustration: `dashboard`, `mobile`, `website`, `checklist`, `compare`

Phir `blog-data.js` mein `cover: "assets/images/blog/<slug>.jpg"` aur `coverAlt` likho.
Zaroorat: Google Chrome/Chromium (headless) aur Python Pillow.
