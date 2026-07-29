/**
 * Universal HTML Sitemap for Blogger
 * Repo: https://github.com/edsaed/sitemap
 */

var allEntries = [];

// Callback Global untuk Feed Blogger
window.fetchBloggerFeed = function (data) {
  var container = document.getElementById('sitemap-container');
  if (!container) return;

  var entries = (data.feed && data.feed.entry) ? data.feed.entry : [];
  allEntries = allEntries.concat(entries);

  var totalResults = parseInt(data.feed.openSearch$totalResults.$t, 10);
  var startIndex = parseInt(data.feed.openSearch$startIndex.$t, 10);
  var itemsPerPage = parseInt(data.feed.openSearch$itemsPerPage.$t, 10);

  // Jika masih ada data berikutnya, panggil lagi
  if (startIndex + itemsPerPage <= totalResults) {
    var nextIndex = startIndex + itemsPerPage;
    loadFeedScript(nextIndex);
  } else {
    // Semua data sudah terkumpul, render ke halaman
    renderSitemapUI(allEntries);
  }
};

function renderSitemapUI(entries) {
  var container = document.getElementById('sitemap-container');
  if (!container) return;

  if (entries.length === 0) {
    container.innerHTML = '<p>Tidak ada artikel ditemukan.</p>';
    return;
  }

  // Kelompokkan berdasarkan Kategori
  var categories = {};
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
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
      if (!categories[label]) categories[label] = [];
      categories[label].push({ title: title, url: postUrl, date: published });
    }
  }

  // Generate HTML
  var html = '<div class="sitemap-summary"><p>Total Artikel: <strong>' + entries.length + '</strong></p></div>';
  var sortedCategories = Object.keys(categories).sort();

  for (var c = 0; c < sortedCategories.length; c++) {
    var cat = sortedCategories[c];
    html += '<div class="sitemap-category-box">';
    html += '<h3 class="sitemap-cat-title"><a href="/search/label/' + encodeURIComponent(cat) + '">' + cat + '</a> (' + categories[cat].length + ')</h3>';
    html += '<ol class="sitemap-list">';

    categories[cat].sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });

    for (var p = 0; p < categories[cat].length; p++) {
      var item = categories[cat][p];
      html += '<li><a href="' + item.url + '" target="_blank" rel="noopener">' + item.title + '</a> <span class="sitemap-date">(' + item.date + ')</span></li>';
    }

    html += '</ol></div>';
  }

  container.innerHTML = html;
}

function loadFeedScript(startIndex) {
  var script = document.createElement('script');
  script.src = '/feeds/posts/summary?alt=json-in-script&start-index=' + startIndex + '&max-results=500&callback=fetchBloggerFeed';
  document.body.appendChild(script);
}

// Inisialisasi Otomatis
(function () {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    loadFeedScript(1);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      loadFeedScript(1);
    });
  }
})();
