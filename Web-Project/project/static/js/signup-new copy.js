const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.remove("success");
  inputControl.classList.add("error");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.remove("error");
  inputControl.classList.add("success");
};
var form = document.getElementById("signup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const isValid = await validateForm();

  if (isValid) {
    console.log("Signup");
    form.submit();
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function validateForm() {
  var email = document.getElementById("email");
  var username = document.getElementById("username");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirm-password");

  var emailValue = email.value.trim();
  var usernameValue = username.value.trim();
  var passwordValue = password.value.trim();
  var confirmPasswordValue = confirmPassword.value.trim();

  var isAdminChecked = document.getElementById("is-admin").checked;
  var isUserChecked = document.getElementById("is-user").checked;

  isAdmin = document.getElementById("is-admin");
  isUser = document.getElementById("is-user");

  const response = await fetch(
    `check/?email=${emailValue}&username=${usernameValue}`
  );
  const data = await response.json();

  var isValid = true;

  if (emailValue == null || emailValue.length == 0) {
    setError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Please enter a valid email");
    isValid = false;
  } else if (data.email_exists) {
    setError(email, "Email is already in use");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue == null || passwordValue.length == 0) {
    setError(password, "Password is required");
    isValid = false;
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters");
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (usernameValue == null || usernameValue.length == 0) {
    setError(username, "Username is required");
    isValid = false;
  } else if (data.username_exists) {
    setError(username, "Username is already taken");
    isValid = false;
  } else {
    setSuccess(username);
  }

  if (confirmPasswordValue == null || confirmPasswordValue.length == 0) {
    setError(confirmPassword, "Password is required");
    isValid = false;
  } else if (passwordValue != confirmPasswordValue) {
    setError(confirmPassword, "Passwords do not match");
    isValid = false;
  } else {
    setSuccess(confirmPassword);
  }

  if (!isAdminChecked && !isUserChecked) {
    setError(isAdmin, "Please select an option");
    isValid = false;
  } else {
    setSuccess(isAdmin);
  }

  return isValid;
}
