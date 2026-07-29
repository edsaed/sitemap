/**
 * Universal & Responsive HTML Sitemap for Blogger
 * Repository: https://github.com/edsaed/sitemap
 */

var allSitemapEntries = [];
var sitemapCategories = {};

// Callback Global Resmi
window.renderBloggerSitemap = function (data) {
  var container = document.getElementById('sitemap-container');
  if (!container) return;

  var entries = (data && data.feed && data.feed.entry) ? data.feed.entry : [];
  allSitemapEntries = allSitemapEntries.concat(entries);

  var totalResults = parseInt(data.feed.openSearch$totalResults.$t, 10);
  var startIndex = parseInt(data.feed.openSearch$startIndex.$t, 10);
  var itemsPerPage = parseInt(data.feed.openSearch$itemsPerPage.$t, 10);

  // Ambil sisa halaman feed jika ada > 500 post
  if (startIndex + itemsPerPage <= totalResults) {
    loadFeedNextPage(startIndex + itemsPerPage);
  } else {
    initSitemapUI();
  }
};

function initSitemapUI() {
  var container = document.getElementById('sitemap-container');
  if (!container) return;

  if (allSitemapEntries.length === 0) {
    container.innerHTML = '<p class="sitemap-empty">Tidak ada artikel ditemukan.</p>';
    return;
  }

  // Olah Data Kategori
  sitemapCategories = {};
  for (var i = 0; i < allSitemapEntries.length; i++) {
    var entry = allSitemapEntries[i];
    var title = entry.title.$t;
    var published = entry.published.$t.substring(0, 10);
    var postUrl = '';

    if (entry.link) {
      for (var j = 0; j < entry.link.length; j++) {
        if (entry.link[j].rel === 'alternate') {
          postUrl = entry.link[j].href;
          break;
        }
      }
    }

    var labels = ['Lainnya'];
    if (entry.category && entry.category.length > 0) {
      labels = [];
      for (var k = 0; k < entry.category.length; k++) {
        labels.push(entry.category[k].term);
      }
    }

    for (var l = 0; l < labels.length; l++) {
      var label = labels[l];
      if (!sitemapCategories[label]) sitemapCategories[label] = [];
      sitemapCategories[label].push({ title: title, url: postUrl, date: published });
    }
  }

  // Render Layout Utama dengan Fitur Search
  var controlsHtml = '<div class="sitemap-controls">';
  controlsHtml += '<input type="text" id="sitemap-search" placeholder="Cari artikel..." onkeyup="window.filterSitemapPosts()" />';
  controlsHtml += '<span class="sitemap-stats">Total: <strong>' + allSitemapEntries.length + '</strong> Artikel | <strong>' + Object.keys(sitemapCategories).length + '</strong> Kategori</span>';
  controlsHtml += '</div>';
  controlsHtml += '<div id="sitemap-content"></div>';

  container.innerHTML = controlsHtml;
  displaySitemapList('');
}

function displaySitemapList(filterText) {
  var contentBox = document.getElementById('sitemap-content');
  if (!contentBox) return;

  var html = '';
  var sortedCategories = Object.keys(sitemapCategories).sort();
  var totalVisible = 0;

  for (var c = 0; c < sortedCategories.length; c++) {
    var cat = sortedCategories[c];
    var posts = sitemapCategories[cat];
    var filteredPosts = [];

    for (var p = 0; p < posts.length; p++) {
      if (posts[p].title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
        filteredPosts.push(posts[p]);
      }
    }

    if (filteredPosts.length > 0) {
      totalVisible += filteredPosts.length;
      html += '<div class="sitemap-category-box">';
      html += '<h3 class="sitemap-cat-title"><a href="/search/label/' + encodeURIComponent(cat) + '" target="_blank">' + cat + '</a> <span>(' + filteredPosts.length + ')</span></h3>';
      html += '<ol class="sitemap-list">';

      filteredPosts.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });

      for (var f = 0; f < filteredPosts.length; f++) {
        var item = filteredPosts[f];
        html += '<li><a href="' + item.url + '" target="_blank" rel="noopener">' + item.title + '</a> <span class="sitemap-date">(' + item.date + ')</span></li>';
      }

      html += '</ol></div>';
    }
  }

  if (totalVisible === 0) {
    html = '<div class="sitemap-empty">Artikel yang Anda cari tidak ditemukan.</div>';
  }

  contentBox.innerHTML = html;
}

// Global Filter Handler
window.filterSitemapPosts = function () {
  var input = document.getElementById('sitemap-search');
  var query = input ? input.value : '';
  displaySitemapList(query);
};

function loadFeedNextPage(startIndex) {
  var script = document.createElement('script');
  script.src = '/feeds/posts/summary?alt=json-in-script&start-index=' + startIndex + '&max-results=500&callback=renderBloggerSitemap';
  document.body.appendChild(script);
}

// Inisialisasi Otomatis
(function () {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    loadFeedNextPage(1);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      loadFeedNextPage(1);
    });
  }
})();
