(function () {
  document.querySelectorAll('.carousel, .media-carousel').forEach(function (el) {
    var isDown = false;
    var startX, scrollLeft;

    el.addEventListener('mousedown', function (e) {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      e.preventDefault();
    });

    document.addEventListener('mouseup', function () { isDown = false; });

    el.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
    });
  });
})();