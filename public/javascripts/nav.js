// toggle nav
const navToggle = () => {
  const menu = document.querySelector('.menu-items');
  const hamburger = document.querySelector('.hamburger-icon');
  const close = document.querySelector('.close-icon');

  menu.classList.toggle('mobile-hide');
  hamburger.classList.toggle('mobile-hide');
  close.classList.toggle('mobile-hide');
};

// logout function
const logout = async () => {
  // logout
  const response = await fetch('/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  // go to home on success
  if (response.ok) {
    document.location.assign('/');
  } else {
    console.log('error when logging out');
  }
}