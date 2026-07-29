# 🚀 Universal Automatic Sitemap for Blogger / Blogspot

Sitemap (Daftar Isi) interaktif, cepat, dan SEO-friendly untuk platform Blogger.

## ✨ Fitur Utama
- ⚡ **SEO & Performance Optimized:** 100% Bebas `document.write()`, aman untuk Core Web Vitals.
- 🔄 **Auto Pagination Support:** Sanggup memuat ribuan artikel (>500 post) tanpa *truncated/cut off*.
- 🔍 **Live Search Filter:** Pengunjung dapat mencari judul artikel secara instan.
- 🌐 **Universal Auto-Domain:** Tidak perlu edit URL manual, otomatis mendeteksi domain tempat script dipasang.
- 📱 **Responsive Design:** Tampilan bersih dan nyaman diakses dari mobile maupun desktop.

---

## 🛠️ Cara Pemasangan

1. Masuk ke Dashboard Blogger Anda.
2. Buat **Halaman Baru** (`Pages` -> `New Page`) dengan judul **Daftar Isi** atau **Sitemap**.
3. Ubah Mode Editor ke **HTML View**.
4. Copy dan Paste kode di bawah ini:

```html
<!-- Container Sitemap -->
<div id="sitemap-container">
  <p>Memuat sitemap...</p>
</div>

<!-- Styling CSS Responsive -->
<style>
  #sitemap-container { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1f2937; line-height: 1.5; margin: 10px 0; }
  .sitemap-controls { display: flex; justify-content: space-between; align-items: center; gap: 15px; margin-bottom: 20px; flex-wrap: wrap; }
  #sitemap-search { flex: 1; min-width: 200px; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; transition: border-color 0.2s; }
  #sitemap-search:focus { border-color: #2563eb; }
  .sitemap-stats { font-size: 13px; color: #4b5563; background: #f3f4f6; padding: 8px 12px; border-radius: 6px; }
  .sitemap-category-box { margin-bottom: 25px; border-bottom: 1px solid #f3f4f6; padding-bottom: 15px; }
  .sitemap-cat-title { font-size: 18px; font-weight: 600; margin-bottom: 10px; }
  .sitemap-cat-title a { color: #111827; text-decoration: none; }
  .sitemap-cat-title span { font-size: 14px; color: #6b7280; font-weight: normal; }
  .sitemap-list { padding-left: 20px; margin: 0; }
  .sitemap-list li { margin-bottom: 8px; font-size: 14px; }
  .sitemap-list a { color: #2563eb; text-decoration: none; }
  .sitemap-list a:hover { text-decoration: underline; }
  .sitemap-date { font-size: 12px; color: #9ca3af; margin-left: 8px; }
  .sitemap-empty { padding: 20px; text-align: center; color: #6b7280; }
</style>

<!-- Load Script Sitemap Universal (Cloudflare CDN) -->
<script src="[https://sitemap.edsaed.workers.dev/sitemap.js](https://sitemap.edsaed.workers.dev/sitemap.js)"></script>
