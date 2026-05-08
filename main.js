// ==UserScript==
// @name         Nyaa Bulk Magnet Downloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Sequentially open magnet links on Nyaa, sorted from last to first
// @match        https://nyaa.si/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Collect and reverse so lowest episode opens first
  const magnetLinks = [...document.querySelectorAll('a[href^="magnet:"]')].reverse();
  let index = 0;

  const wrapper = document.createElement('p');
  wrapper.style.textAlign = 'center';

  function updateUI() {
    if (magnetLinks.length === 0) {
      wrapper.innerHTML = 'No magnet links found on this page.';
      return;
    }

    if (index >= magnetLinks.length) {
      wrapper.innerHTML = `All ${magnetLinks.length} magnet links opened.`;
      return;
    }

    wrapper.innerHTML =
      `<a href="#" id="nyaa-bulk-btn">[Open magnet ${index + 1} of ${magnetLinks.length}]</a>` +
      ` &nbsp; <span>${index} done so far</span>`;

    document.getElementById('nyaa-bulk-btn').addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = magnetLinks[index].href;
      index++;
      setTimeout(updateUI, 500);
    });
  }

  const targetDiv = document.querySelector('body > div.container');
  if (targetDiv) {
    targetDiv.insertBefore(wrapper, targetDiv.children[1]);
  }

  updateUI();
})();
