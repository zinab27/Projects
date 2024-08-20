// document.addEventListener("DOMContentLoaded", function () {
//   //books = JSON.parse(localStorage.getItem("books"));

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

const authordec = decodeURIComponent(urlParams.get("author")).trim();
const descriptiondec = decodeURIComponent(urlParams.get("description"));
const publisheddec = urlParams.get("published");
const ISBNdec = urlParams.get("ISBN");
const pricedec = urlParams.get("price");
const index = decodeURIComponent(urlParams.get("index"));
const titledec = decodeURIComponent(urlParams.get("title")).trim();
const genredec = decodeURIComponent(urlParams.get("genre")).trim(); //thrim()//without spaces
const photodec = decodeURIComponent(urlParams.get("photo")).trim(); // n

console.log(photodec);
console.log("Decoded Title:", decodeURIComponent(urlParams.get("title")));
console.log(
  "Trimmed Title:",
  decodeURIComponent(urlParams.get("title")).trim()
);

operation = "create";

if (bookId) {
  // Populate the form with existing book data
  operation = "update";
  document.getElementById("header").innerText = "Update Book";
  document.getElementById("submit").value = "Update";
  document.getElementById("id").value = bookId;
  document.getElementById("name").value = titledec;
  document.getElementById("author").value = authordec;
  document.getElementById("cat").value = genredec;
  document.getElementById("description").value = descriptiondec;
  document.getElementById("date").value = FormDate(publisheddec);
  document.getElementById("isbn").value = ISBNdec;
  document.getElementById("price").value = pricedec;
  document.getElementById("myFile").text = photodec;
}

function FormDate(date) {
  let d = new Date(date);
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let year = d.getFullYear();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}

let submit = document.getElementById("submit");
let id = document.getElementById("id");
let bookName = document.getElementById("name");
let author = document.getElementById("author");
let genre = document.getElementById("cat");
let description = document.getElementById("description");
let published = document.getElementById("date");
let ISBN = document.getElementById("isbn");
let price = document.getElementById("price");
let photo = document.getElementById("myFile");

console.log(
  id.value,
  bookName.value,
  author.value,
  genre.value,
  description.value,
  published.value,
  ISBN.value,
  price.value,
  photo.value
);

submit.addEventListener("click", async function (e) {
  e.preventDefault(); // Prevent form submission

  if (operation == "create") {
    const isValid = await validateInputs();

    if (isValid) {
      const formData = new FormData(document.getElementById("add-form"));

      fetch("./addBook/", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("Book Added Successfully");
            window.location.href = adminUrl;
          } else {
            console.error("Failed to add book");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    // window.location.href = "admin.html"; // Redirect back to the first page
  }

  if (operation == "update") {
    const formData = new FormData(document.getElementById("add-form"));

    // &genre=${genre.value}&author=${author.value}
    //   & description = ${description.value} & title = ${bookName.value} & published=${published.value}
    //   & isbn = ${ISBN.value} & price = ${price.value}
    const bookId = id.value;
    fetch(`./update_book/ `, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Book Updated Successfully");
          window.location.href = adminUrl;
        } else {
          console.error("Failed to update book");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

// validation
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.remove("error");
  inputControl.classList.add("success");
};

const validateInput = (element, value, errorMessage) => {
  if (value == null || value.length === 0) {
    setError(element, errorMessage);
    return false;
  } else {
    setSuccess(element);
    return true;
  }
};

const validateNumber = (element, value, errorMessage) => {
  if (isNaN(parseInt(value))) {
    setError(element, errorMessage);
    return false;
  } else {
    setSuccess(element);
    return true;
  }
};

const validateId = async (element, value, errorMessage) => {
  const response = await fetch(`checkid/?id=${value}`);
  const data = await response.json();

  console.log(data);

  if (data.ID_exists == true) {
    setError(element, errorMessage);
    return false;
  } else {
    setSuccess(element);
    return true;
  }
};

const validateInputs = async () => {
  const idValue = id.value.trim();
  const nameValue = bookName.value.trim();
  const authorValue = author.value.trim();
  const genreValue = genre.value.trim();
  const descriptionValue = description.value.trim();
  const dateValue = date.value.trim();
  const isbnValue = ISBN.value.trim();
  const priceValue = price.value.trim();
  const photoValue =
    photo.files.length > 0 ? "pics/" + photo.files[0].name : photo.text;
  isIdValid = validateNumber(id, idValue, "Book ID must be a number");
  const isNameValid = validateInput(
    bookName,
    nameValue,
    "Book Name is required"
  );
  const isAuthorValid = validateInput(
    author,
    authorValue,
    "Book Author is required"
  );
  const isGenreValid = validateInput(
    genre,
    genreValue,
    "Book genre is required"
  );
  const isDescriptionValid = validateInput(
    description,
    descriptionValue,
    "Book description is required"
  );
  const isDateValid = validateInput(date, dateValue, "Book date is required");
  const isISBNValid = validateNumber(ISBN, isbnValue, "ISBN must be a number");
  const isPriceValid = validateNumber(
    price,
    priceValue,
    "Price must be a number"
  );
  const isPhotoValid = validateInput(photo, photoValue, "Photo is required");

  if (isIdValid) {
    isIdValid = await validateId(id, idValue, "Book ID is already in use");
  }

  if (
    isIdValid &&
    isNameValid &&
    isAuthorValid &&
    isGenreValid &&
    isDescriptionValid &&
    isDateValid &&
    isISBNValid &&
    isPriceValid &&
    isPhotoValid
  ) {
    return true;
  }
  return false;
};

// let submit = document.getElementById("submit");
// let id = document.getElementById("id");
// let bookName = document.getElementById("name");
// let author = document.getElementById("author");
// let genre = document.getElementById("cat");
// let description = document.getElementById("description");
// let published = document.getElementById("date");
// let ISBN = document.getElementById("isbn");
// let price = document.getElementById("price");
// let photo = document.getElementById("myFile");

// const idValue = id.value.trim();
// const nameValue = bookName.value.trim();
// const authorValue = author.value.trim();
// const genreValue = genre.value.trim();
// const descriptionValue = description.value.trim();
// const dateValue = date.value.trim();
// const isbnValue = ISBN.value.trim();
// const priceValue = price.value.trim();
// const photoValue =
//   photo.files.length > 0 ? "pics/" + photo.files[0].name : photo.text;

// async function addBook() {
//   const csrfToken = document.cookie.match(/csrftoken=([0-9a-zA-Z]+);?/)[1];
//   fetch("./update_or_add_book/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-CSRFToken": csrfToken,
//     },
//     body: JSON.stringify({
//       //id: idValue, //
//       title: nameValue, //
//       author: authorValue, //
//       genre: genreValue, //
//       description: descriptionValue, //
//       published: dateValue, //
//       ISBN: isbnValue, //
//       price: priceValue, //
//       image: photoValue, //
//       // Handle photo upload if needed
//     }),
//   }).then((response) => {
//     if (response.ok) {
//       console.log("Added Done"); // Reload the page after successful submission
//     } else {
//       console.error("Failed to save book");
//     }
//   });
// }
