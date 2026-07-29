/**
 * Universal & Professional Blogger HTML Sitemap / Table of Contents
 * Repository: https://github.com/edsaed/sitemap
 * Features: Auto-pagination (>500 posts), Search filter, Category grouping, Clean DOM
 */

(function () {
  'use strict';

  let allEntries = [];
  let categories = {};

  // 1. Render Tampilan Utama
  function renderSitemapUI() {
    const container = document.getElementById('sitemap-container');
    if (!container) return;

    let html = `
      <div class="sitemap-controls">
        <input type="text" id="sitemap-search" placeholder="Cari judul artikel..." onkeyup="window.filterSitemapPosts()" />
        <span class="sitemap-stats">Total: <strong id="sitemap-total-count">${allEntries.length}</strong> Artikel</span>
      </div>
      <div id="sitemap-content"></div>
    `;

    container.innerHTML = html;
    buildCategoryData(allEntries);
    displaySitemap();
  }

  // 2. Olah Data Kategori & Sorting
  function buildCategoryData(entries) {
    categories = {};

    entries.forEach((entry) => {
      const title = entry.title.$t;
      const published = entry.published.$t.substring(0, 10);

      let postUrl = '';
      if (entry.link) {
        const altLink = entry.link.find((l) => l.rel === 'alternate');
        if (altLink) postUrl = altLink.href;
      }

      const labels = entry.category
        ? entry.category.map((c) => c.term)
        : ['Lainnya'];

      labels.forEach((label) => {
        if (!categories[label]) categories[label] = [];
        categories[label].push({ title, url: postUrl, date: published });
      });
    });
  }

  // 3. Tampilkan List Artikel
  function displaySitemap(filterText = '') {
    const contentBox = document.getElementById('sitemap-content');
    if (!contentBox) return;

    let html = '';
    const sortedCategories = Object.keys(categories).sort();
    let totalVisible = 0;

    sortedCategories.forEach((category) => {
      const filteredPosts = categories[category].filter((post) =>
        post.title.toLowerCase().includes(filterText.toLowerCase())
      );

      if (filteredPosts.length > 0) {
        totalVisible += filteredPosts.length;
        html += `<div class="sitemap-category-box">`;
        html += `<h3 class="sitemap-cat-title"><a href="/search/label/${encodeURIComponent(category)}" target="_blank" rel="noopener">${category}</a> <span>(${filteredPosts.length})</span></h3>`;
        html += `<ol class="sitemap-list">`;

        // Sort artikel A-Z
        filteredPosts.sort((a, b) => a.title.localeCompare(b.title));

        filteredPosts.forEach((post) => {
          html += `<li>
            <a href="${post.url}" target="_blank" rel="noopener">${post.title}</a>
            <span class="sitemap-date">${post.date}</span>
          </li>`;
        });

        html += `</ol></div>`;
      }
    });

    if (totalVisible === 0) {
      html = `<div class="sitemap-empty">Artikel tidak ditemukan.</div>`;
    }

    contentBox.innerHTML = html;
  }

  // 4. Fitur Filter / Pencarian Live
  window.filterSitemapPosts = function () {
    const searchInput = document.getElementById('sitemap-search');
    const query = searchInput ? searchInput.value : '';
    displaySitemap(query);
  };

  // 5. Recursive Fetcher (Paging Otomatis untuk >500 Artikel)
  window.fetchBloggerFeed = function (data) {
    const entries = data.feed.entry || [];
    allEntries = allEntries.concat(entries);

    const totalResults = parseInt(data.feed.openSearch$totalResults.$t, 10);
    const startIndex = parseInt(data.feed.openSearch$startIndex.$t, 10);
    const itemsPerPage = parseInt(data.feed.openSearch$itemsPerPage.$t, 10);

    // Render secara bertahap saat data masuk
    renderSitemapUI();

    // Jika masih ada sisa artikel, ambil halaman berikutnya secara otomatis
    if (startIndex + itemsPerPage <= totalResults) {
      const nextIndex = startIndex + itemsPerPage;
      loadFeedScript(nextIndex);
    }
  };

  function loadFeedScript(startIndex = 1) {
    const currentDomain = window.location.origin;
    const script = document.createElement('script');
    script.src = `${currentDomain}/feeds/posts/summary?alt=json-in-script&start-index=${startIndex}&max-results=500&callback=fetchBloggerFeed`;
    document.body.appendChild(script);
  }

  // Inisialisasi saat DOM SIAP
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadFeedScript(1));
  } else {
    loadFeedScript(1);
  }
})();
