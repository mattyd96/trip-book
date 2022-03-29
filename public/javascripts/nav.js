// toggle nav
const menuBtn = document.querySelector("#mobile-menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");

const menuToggle = (e) => {
  mobileMenu.classList.toggle("hidden");
};

menuBtn.addEventListener("click", menuToggle);

// logout function
const logout = async () => {
  // logout
  const response = await fetch("/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  // go to home on success
  if (response.ok) {
    document.location.assign("/");
  } else {
    console.log("error when logging out");
  }
};
