function logOut() {
  localStorage.setItem("isLoggedIn", "false");
  document.getElementById("login").style.display = "block";
  document.getElementById("signup").style.display = "block";
  document.getElementById("browse").style.display = "block";
  document.getElementById("borrow").style.display = "none";
  document.getElementById("logout").style.display = "none";
}
