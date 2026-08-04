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
  <p class="sitemap-empty">Memuat sitemap...</p>
</div>

<!-- Styling CSS Universal (Hanya Struktur, Tanpa Warna) -->
<style>
  /* Mewarisi font dan warna dari template blog masing-masing */
  #sitemap-container { 
    font-family: inherit; 
    color: inherit; 
    line-height: 1.6; 
    margin: 1em 0; 
  }
  
  /* Layout Pencarian dan Statistik */
  .sitemap-controls { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    gap: 15px; 
    margin-bottom: 2em; 
    flex-wrap: wrap; 
  }
  
  /* Input Pencarian Universal */
  #sitemap-search { 
    flex: 1; 
    min-width: 200px; 
    padding: 10px 15px; 
    /* Mengikuti warna teks template, tapi dibuat sedikit transparan garisnya */
    border: 1px solid currentColor; 
    border-radius: 6px; 
    font-size: 1em; 
    background: transparent; 
    color: inherit; 
    font-family: inherit; 
    opacity: 0.6; 
    transition: opacity 0.3s ease; 
  }
  #sitemap-search:focus { 
    opacity: 1; 
    outline: none; 
  }
  
  /* Statistik */
  .sitemap-stats { 
    font-size: 0.9em; 
    opacity: 0.8; 
    padding: 8px 12px; 
    border: 1px dashed currentColor; 
    border-radius: 6px; 
  }
  
  /* Jarak Antar Kategori */
  .sitemap-category-box { 
    margin-bottom: 2em; 
  }
  
  /* Judul Kategori */
  .sitemap-cat-title { 
    font-size: 1.25em; 
    font-weight: bold; 
    margin-bottom: 0.8em; 
    /* Garis bawah mengikuti warna teks template */
    border-bottom: 1px solid currentColor; 
    padding-bottom: 5px; 
  }
  .sitemap-cat-title a { 
    text-decoration: none; 
    /* Sengaja tidak diberi warna agar link mewarisi CSS <a> dari template blog pengguna */
  }
  .sitemap-cat-title span { 
    font-size: 0.8em; 
    font-weight: normal; 
    opacity: 0.6; 
  }
  
  /* Daftar Artikel (List) */
  .sitemap-list { 
    padding-left: 1.5em; 
    margin: 0; 
  }
  .sitemap-list li { 
    margin-bottom: 0.5em; 
  }
  
  /* Tanggal dan Status Kosong */
  .sitemap-date { 
    font-size: 0.85em; 
    opacity: 0.6; 
    margin-left: 5px; 
  }
  .sitemap-empty { 
    padding: 2em; 
    text-align: center; 
    opacity: 0.7; 
  }
</style>

<!-- Load Script Sitemap Universal (Cloudflare CDN) -->
<script src="https://sitemap.edsaed.workers.dev/sitemap.js"></script>
