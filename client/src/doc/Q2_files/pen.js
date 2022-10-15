const desktopButton = document.querySelector("#desktop-btn");

const mobileButton = document.querySelector("#mobile-btn");

desktopButton.addEventListener("click", () => {
  document.getElementById("myFrame").width = "100%";
});
mobileButton.addEventListener("click", () => {
  document.getElementById("myFrame").width = "420px";
});