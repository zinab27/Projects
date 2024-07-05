localStorage.setItem("isLoggedIn", false);
const form = document.getElementById("form");
const username = document.querySelector("#username");
const password = document.querySelector("#confirm-password");

function loginOperation() {
  usernameValue = username.value;
  passwordValue = password.value;

  // Make AJAX request to Django's built-in login view
  $.post("/login/", {
    username: usernameValue,
    password: passwordValue,
  })
    .done(function (response) {
      if (response.success) {
        // Authentication successful, redirect to homepage
        window.location.href = "/homepage/";
      } else {
        // Authentication failed, show error message
        setError(password, "Incorrect username or password");
      }
    })
    .fail(function (xhr, status, error) {
      // Handle AJAX error
      console.error(xhr.responseText);
    });
}

/*
function loginOperation() {
  usernameValue = username.value;
  passwordValue = password.value;
  Persons = JSON.parse(localStorage.getItem("Persons"));
  for (let i = 0; i < Persons.length; i++) {
    isAdmin = Persons[i].isAdmin;
    isUser = Persons[i].isUser;
    if (
      Persons[i].username == usernameValue &&
      Persons[i].password == passwordValue &&
      isUser
    ) {
      setSuccess(username);
      setSuccess(password);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("isUser", true);
      localStorage.setItem("isAdmin", false);
      window.location.href = "homepage.html";
      break;
    } else if (
      Persons[i].username == usernameValue &&
      Persons[i].password == passwordValue &&
      isAdmin
    ) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("isAdmin", true);
      localStorage.setItem("isUser", false);
      window.location.href = "homepage.html";
      break;
    } else if (
      Persons[i].username == usernameValue &&
      Persons[i].password != passwordValue
    ) {
      setSuccess(username);
      setError(password, "Wrong Password");
      break;
    } else if (
      Persons[i].username != usernameValue &&
      Persons[i].password != passwordValue
    ) {
      setError(password, "Invalid Input");
      setError(username, "This username doesn't exist");
    }
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
  loginOperation();
});
*/
const setError = (element, message) => {
  const inputControl = element.parentElement;
  console.log(inputControl);
  const errorDisplay = inputControl.querySelector(".error");
  console.log(errorDisplay);
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

const validateInputs = () => {
  usernameValue = username.value;
  passwordValue = password.value;

  if (usernameValue === "" || usernameValue.length == 0) {
    setError(username, "Username is required");
  } else {
    setSuccess(username);
  }

  if (passwordValue === "" || passwordValue.length == 0) {
    setError(password, "Password is required");
    console.log("pass is required");
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters");
  } else {
    setSuccess(password);
  }

  // let Persons;
  // if (localStorage.Persons != null) {
  //   Persons = JSON.parse(localStorage.books);
  // } else {
  //   Persons = [
  //     {
  //       email: "menna@gmail.com",
  //       username: "manonaa",
  //       password: "mm11mm11",
  //       isAdmin: true,
  //       isUser: false,
  //     },
  //     {
  //       email: "zinab@yahoo.com",
  //       username: "zizi",
  //       password: "zz11zz11",
  //       isUser: false,
  //       isAdmin: true,
  //     },
  //     {
  //       email: "nada@yahoo.com",
  //       username: "nadood",
  //       password: "nn22nn22",
  //       isUser: true,
  //       isAdmin: false,
  //     },
  //     {
  //       email: "mariam@yahoo.com",
  //       username: "mariomaa",
  //       password: "mm22mm22",
  //       isUser: true,
  //       isAdmin: false,
  //     },
  //   ];
  //   localStorage.Persons = JSON.stringify(Persons);
  // }
};
