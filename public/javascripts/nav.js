const navToggle = () => {
  const menu = document.querySelector('.menu-items');
  const hamburger = document.querySelector('.hamburger-icon');
  const close = document.querySelector('.close-icon');

  menu.classList.toggle('mobile-hide');
  hamburger.classList.toggle('mobile-hide');
  close.classList.toggle('mobile-hide');
};