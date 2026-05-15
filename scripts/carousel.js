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

    el.addEventListener('mouseleave', function () {
      isDown = false;
    });

    el.addEventListener('mouseup', function () {
      isDown = false;
    });

    el.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - el.offsetLeft;
      var walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
    });
  });
})();