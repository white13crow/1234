
document.addEventListener("DOMContentLoaded", function(){
  function setHeaderHeight(){
    var header = document.querySelector('.header');
    if(!header) return;
    header.style.minHeight = (window.innerHeight * 0.6) + 'px';
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
});