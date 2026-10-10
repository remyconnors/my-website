/* Shared header/nav loader.
 * Fetches nav.html once and injects it into <header class="site-header">,
 * then marks the current page's link based on the header's data-page value.
 * Works on any static host (Neocities, GitHub Pages).
 * Note: fetch() needs http(s) — preview via a local server, not file://
 *       (e.g. `python3 -m http.server` then open http://localhost:8000).
 */
(function () {
  var header = document.querySelector(".site-header");
  if (!header) return;

  fetch("nav.html")
    .then(function (r) { return r.text(); })
    .then(function (html) {
      header.innerHTML = html;
      var page = header.dataset.page;               // e.g. "home"
      if (!page) return;
      var link = header.querySelector('[data-nav="' + page + '"]');
      if (link) link.setAttribute("aria-current", "page");
    })
    .catch(function () {
      // Never leave a page nav-less if the fetch fails.
      header.innerHTML =
        '<a class="wordmark" href="index.html">Remy Connors</a>';
    });
})();
