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

    
  });
})();