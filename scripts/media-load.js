document.addEventListener("DOMContentLoaded", () => {
  const selectors = "img, video, iframe";

  document.querySelectorAll(selectors).forEach((el) => {
    const markLoaded = () => el.classList.add("loaded");

    if (el.tagName === "IMG") {
      if (el.complete && el.naturalWidth > 0) {
        markLoaded();
      } else {
        el.addEventListener("load", markLoaded);
        el.addEventListener("error", markLoaded);
      }
    } else if (el.tagName === "VIDEO") {
      if (el.readyState >= 1) {
        markLoaded();
      } else {
        el.addEventListener("loadedmetadata", markLoaded);
        el.addEventListener("canplay", markLoaded);
        el.addEventListener("error", markLoaded);
      }
    } else if (el.tagName === "IFRAME") {
      el.addEventListener("load", markLoaded);
    }
  });
});
