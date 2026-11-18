# Naya blog kaise daalein

Saare blogs ek hi file mein hain: `assets/js/blog-data.js`

## Steps
1. `assets/js/blog-data.js` kholo.
2. Pehle blog ka poora `{ ... }` block copy karo.
3. Aakhri `}` ke baad comma `,` lagao aur copy kiya hua block paste karo.
4. Values badlo:
   - `slug` – chhote letters, words ke beech `-` (har blog ka alag). Ye URL banta hai:
     `blog-detail.html?post=your-slug`
   - `title`, `excerpt` (card par 1–2 line), `metaDescription` (Google ke liye)
   - `category`, `tags`, `keywords`
   - `date` – `"YYYY-MM-DD"` format. Sabse nayi date wala blog sabse upar "Latest" mein aata hai.
   - `cover` – image ho to `"assets/images/blog/naam.jpg"`, nahi to `""` (purple cover apne aap banega)
   - `content` – article HTML mein, do backticks `` ` `` ke beech.
     Har `<h2>` apne aap "On this page" menu mein aa jaata hai.
5. Save karo. Blog list aur detail page apne aap update ho jaate hain.

## Dhyan rakhein
- `content` ke andar backtick `` ` `` mat likhna.
- Blog images `assets/images/blog/` folder mein rakho.
- Upload karne ke baad browser mein **Ctrl + Shift + R** dabao.

## Blog ka apna page (SEO ke liye behtar)
Har blog `blog-detail.html?post=slug` par apne aap khul jaata hai.
Kisi blog ka alag page (jaise `ai-website-builder-vs-designer.html`) ho to:
- `blog-data.js` mein us blog par `url: "naam.html"` likho.
- Naye page ko `sitemap.xml` mein bhi jod do.
Is page mein Google ka title/description aur LinkedIn/WhatsApp share image pehle se lage hote hain.

## Website ka address
Share links aur sitemap mein `https://ms.primeznews.com` likha hai.
Website kisi aur address par live ho to in files mein address badal dena:
`sitemap.xml`, `robots.txt`, aur `ai-website-builder-vs-designer.html` (upar `<head>` mein).
