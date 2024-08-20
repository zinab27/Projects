/*

let Persons;
if (localStorage.Persons != null) {
  Persons = JSON.parse(localStorage.getItem("Persons"));
} else {
  Persons = [
    {
      email: "manonaa.com",
      username: "manonaa",
      password: "mm11mm11",
      isAdmin: true,
      isUser: false,
      isLoggedIn: false,
    },
    {
      email: "zz.com",
      username: "zizi",
      password: "zz11zz11",
      isUser: true,
      isAdmin: false,
      isLoggedIn: false,
    },
  ];
  localStorage.Persons = JSON.stringify(Persons);
}

function addPerson() {
  email = document.getElementById("email").value;
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  isAdmin = document.getElementById("is-admin").checked;
  isUser = document.getElementById("is-user").checked;
  const person = {
    email: email,
    username: username,
    password: password,
    isAdmin: isAdmin,
    isUser: isUser,
  };
  Persons.push(person);
  localStorage.Persons = JSON.stringify(Persons);
  alert("Signed Up Successfully");
}*/

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

form.addEventListener("submit", (e) => {
  //e.preventDefault();

  validateForm();
  /*
  if (validateForm()) {
    addPerson();
    window.location.href = "signin.html";
  }*/
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateForm() {
  var email = document.getElementById("email");
  var username = document.getElementById("username");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirm-password");

  emailValue = email.value.trim();
  usernameValue = username.value.trim();
  passwordValue = password.value.trim();
  confirmPasswordValue = confirmPassword.value.trim();
  Persons = JSON.parse(localStorage.getItem("Persons"));

  var isAdminChecked = document.getElementById("is-admin").checked;

  var isUserChecked = document.getElementById("is-user").checked;

  if (emailValue == null || emailValue.length == 0) {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Please enter a valid email");
  } else if (Persons.some((person) => person.email === emailValue)) {
    setError(email, "Email is already in use");
  } else {
    setSuccess(email);
  }

  if (passwordValue == null || passwordValue.length == 0) {
    setError(password, "Password is required");
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters");
  } else {
    setSuccess(password);
  }

  if (usernameValue == null || usernameValue.length == 0) {
    setError(username, "Username is required");
  } else if (Persons.some((person) => person.username === usernameValue)) {
    setError(username, "Username is already taken");
  } else {
    setSuccess(username);
  }

  if (confirmPasswordValue == null || confirmPasswordValue.length == 0) {
    setError(confirmPassword, "Password is required");
  } else if (passwordValue != confirmPasswordValue) {
    setError(confirmPassword, "Passwords do not match");
  } else {
    setSuccess(confirmPassword);
  }

  isAdmin = document.getElementById("is-admin");
  isUser = document.getElementById("is-user");

  if (!isAdminChecked && !isUserChecked) {
    setError(isAdmin, "Please select an option");
  } else setSuccess(isAdmin);

  return (
    emailValue != "" &&
    passwordValue != "" &&
    usernameValue != "" &&
    passwordValue === confirmPassword.value &&
    (isAdminChecked || isUserChecked) &&
    isValidEmail(emailValue)
  );
}
