// --- YouTube videos
let players = {};
let playerButton = Array.from(document.getElementsByClassName('player-button'));
let playerHolder = Array.from(document.getElementsByClassName('player'));
let slides = Array.from(document.getElementsByClassName('swiper-slide'));

if (playerHolder.length) {
  let tag = document.createElement('script');
  let firstScriptTag = document.getElementsByTagName('script')[0];

  tag.src = "https://www.youtube.com/iframe_api";
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
  playerHolder.forEach(function (player) {
    let videoId = player.dataset.videoId;

    players[videoId] = new YT.Player(player, {
      videoId: videoId,
      playerVars: {
        showinfo: 0,
        hidecontrols: 1,
        rel: 0
      }
    });
  });
}

(function () {
  // --- Helper functions
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // --- Main
  document.addEventListener('DOMContentLoaded', () => {
    let swiper = new Swiper('.swiper-container', {
      simulateTouch: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });

    swiper.on('slideChange', function () {
      slides.forEach(function(slide) {
        players[`${slide.dataset.videoId}`].pauseVideo();
      });
    });
  });

  // --- Events
  window.addEventListener('load', () => {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
  });
})();
