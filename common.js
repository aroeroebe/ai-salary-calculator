/**
 * common.js — 共通コンポーネント
 * ページ読み込み時に自動実行:
 *   - パンくずナビ（ツールページのみ）
 *   - フッター
 *
 * 使い方: <body data-page="tool" data-title="実質時給計算機">
 *   data-page: "home" | "tool"
 *   data-title: ページ名（パンくず用）
 */

(function () {
  'use strict';

  /* ── ページ情報 ── */
  var body      = document.body;
  var pageType  = body.getAttribute('data-page')  || 'home';
  var pageTitle = body.getAttribute('data-title') || '';

  /* ── パンくずナビ（ツールページのみ） ── */
  function renderBreadcrumb() {
    if (pageType !== 'tool') return;

    var nav = document.createElement('nav');
    nav.className = 'breadcrumb-nav';
    nav.setAttribute('aria-label', 'パンくずリスト');
    nav.innerHTML =
      '<div class="breadcrumb-inner">' +
        '<a href="/" class="breadcrumb-item">' +
          '<span class="breadcrumb-home-icon" aria-hidden="true">' +
            '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M1 5.5L6 1L11 5.5V11H7.5V8H4.5V11H1V5.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="none"/>' +
            '</svg>' +
          '</span>' +
          'ホーム' +
        '</a>' +
        '<span class="breadcrumb-sep" aria-hidden="true">/</span>' +
        '<span class="breadcrumb-item current" aria-current="page">' + pageTitle + '</span>' +
      '</div>';

    /* ヘッダーの直後に挿入 */
    var header = document.querySelector('header');
    if (header && header.nextSibling) {
      header.parentNode.insertBefore(nav, header.nextSibling);
    } else if (header) {
      header.parentNode.appendChild(nav);
    }
  }

  /* ── フッター ── */
  function renderFooter() {
    var footer = document.createElement('footer');
    footer.innerHTML =
      '<nav class="footer-nav" aria-label="フッターナビ">' +
        '<a href="/">トップページ</a>' +
        '<a href="/real-jikyuu.html">実質時給計算機</a>' +
        '<a href="/raise-price.html">単価アップ診断</a>' +
      '</nav>' +
      '<p class="footer-copy">&copy; 2025 Webライター向け無料ツール</p>';
    document.body.appendChild(footer);
  }

  /* ── GA4 イベント送信ヘルパー（各ページから呼べる） ── */
  window.trackCalc = function (label) {
    try {
      if (typeof gtag === 'function') {
        gtag('event', 'calculate', { event_category: 'tool', event_label: label });
      }
    } catch (e) {}
  };

  /* ── 初期化 ── */
  function init() {
    renderBreadcrumb();
    renderFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
