(function () {
  var rightSVG = "<svg xmlns='http://www.w3.org/2000/svg' width='56' height='auto' mix-blend-mode='difference' viewBox='0 0 153 142' fill='none'><path d='M79.196 137.532L142.128 74.5997M78.1353 3.53552L149.2 74.5997M144.25 70.4073H0' stroke='#231610' stroke-width='10'/></svg>";
  var leftSVG = "<svg xmlns='http://www.w3.org/2000/svg' width='56' height='auto' mix-blend-mode='difference' viewBox='0 0 153 142' fill='none'><path d='M73.5389 137.532L10.6064 74.5997M74.5996 3.53552L3.53534 74.5997M8.48508 70.4073H152.735' stroke='#231610' stroke-width='10'/></svg>";
  var rightCursor = "url(\"data:image/svg+xml," + encodeURIComponent(rightSVG) + "\") 16 16, w-resize";
  var leftCursor = "url(\"data:image/svg+xml," + encodeURIComponent(leftSVG) + "\") 16 16, w-resize";

  function isMobile() {
    return window.innerWidth <= 500;
  }

  function getVisibleIndex(el, imgs) {
    var elRect = el.getBoundingClientRect();
    var centerX = elRect.left + elRect.width / 2;
    var closest = 0, minDist = Infinity;
    imgs.forEach(function (img, i) {
      var r = img.getBoundingClientRect();
      var dist = Math.abs((r.left + r.width / 2) - centerX);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    return closest;
  }

  function getLeftmostIndex(el, imgs) {
    var elRect = el.getBoundingClientRect();
    var contentLeft = elRect.left + parseFloat(getComputedStyle(el).paddingLeft);
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].getBoundingClientRect().right > contentLeft) return i;
    }
    return 0;
  }

  function scrollToImg(el, img) {
    var paddingLeft = parseFloat(getComputedStyle(el).paddingLeft);
    var elRect = el.getBoundingClientRect();
    var imgRect = img.getBoundingClientRect();
    el.scrollTo({ left: el.scrollLeft + imgRect.left - elRect.left - paddingLeft, behavior: 'smooth' });
  }

  document.querySelectorAll('.carousel').forEach(function (el) {
    var isDown = false, startX, scrollLeft;

    el.addEventListener('mousemove', function (e) {
      if (isMobile()) {
        if (!isDown) return;
        e.preventDefault();
        el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
        return;
      }
      var rect = el.getBoundingClientRect();
      el.style.cursor = (e.clientX - rect.left > rect.width / 2) ? rightCursor : leftCursor;
    });

    el.addEventListener('mouseleave', function () {
      el.style.cursor = '';
      isDown = false;
    });

    el.addEventListener('mouseup', function () {
      isDown = false;
    });

    el.addEventListener('mousedown', function (e) {
      if (!isMobile()) return;
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      e.preventDefault();
    });

    el.addEventListener('click', function (e) {
      if (isMobile()) return;
      var imgs = Array.from(el.querySelectorAll('img'));
      if (!imgs.length) return;
      var rect = el.getBoundingClientRect();
      var goRight = e.clientX - rect.left > rect.width / 2;
      var idx = goRight ? getVisibleIndex(el, imgs) : getLeftmostIndex(el, imgs);
      var targetIdx = goRight ? Math.min(idx + 1, imgs.length - 1) : Math.max(idx - 1, 0);
      scrollToImg(el, imgs[targetIdx]);
    });
  });

  document.querySelectorAll('.media-carousel').forEach(function (el) {
    var isDown = false, startX, scrollLeft;

    el.addEventListener('mousedown', function (e) {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      e.preventDefault();
    });

    el.addEventListener('mouseleave', function () {
      isDown = false;
    });

    el.addEventListener('mouseup', function () {
      isDown = false;
    });

    el.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
    });
  });
})();
