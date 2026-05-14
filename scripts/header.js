(function () {
  var header = document.querySelector('header');
  var lastY = window.scrollY;

  window.addEventListener('scroll', function () {
    var currentY = window.scrollY;
    if (currentY < lastY || currentY <= 0) {
      header.classList.remove('header-hidden');
    } else {
      header.classList.add('header-hidden');
    }
    lastY = currentY;
  }, { passive: true });
})();
