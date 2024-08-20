const form = document.getElementById("form");
const username = document.querySelector("#username");
const password = document.querySelector("#confirm-password");

// async function checkUserExistence() {
//   const usernameValue = username.value;
//   const passwordValue = password.value;

//   const response = await fetch(`/check_user_existence/`, {
//     method: "POST",
//     body: JSON.stringify({ username: usernameValue, password: passwordValue }),
//   });
//   if (response.status === 200) {
//     const data = await response.json();
//     console.log(data);
//     if (data.UsernameExists && data.PasswordExists) {
//       setSuccess(username);
//       setSuccess(password);
//     } else if (data.UsernameExists) {
//       setError(password, "Invalidpassword");
//     } else {
//       setError(username, "Username or password is incorrect");
//       setError(password, "Username or password is incorrect");
//     }
//   } else {
//     // Handle other HTTP status codes
//     setError(username, "Server error, please try again later");
//     setError(password, "Server error, please try again later");
//   }
// }

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const isValid = await validateInputs();

  //validateInputs();
  if (isValid) {
    form.submit();
    //window.location.href = "./homepage";
  }
});

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

const validateInputs = async () => {
  usernameValue = username.value;
  passwordValue = password.value;
  var isValid = true;

  const csrfToken = document.querySelector(
    "input[name=csrfmiddlewaretoken]"
  ).value;

  const response = await fetch("./checker/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify({
      username: usernameValue,
      password: passwordValue,
    }),
  });

  if (!response.ok) {
    setError(username, "Server error, please try again later");
    setError(password, "Server error, please try again later");
    return false;
  }

  const data = await response.json();

  if (
    usernameValue === "" ||
    usernameValue.length == 0 ||
    !data.UsernameExists
  ) {
    setError(username, "Username is invalid");
    isValid = false;
  } else {
    setSuccess(username);
  }

  if (
    passwordValue === "" ||
    passwordValue.length == 0 ||
    !data.PasswordExists
  ) {
    setError(password, "Password is invalid");
    isValid = false;
  } else {
    setSuccess(password);
  }

  return isValid;
};
