function deleteBook(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    showBook();
    alert("Book deleted successfully");
    countBook();
    updateBookCount();
  }
}

function deleteAllBooks() {
  if (confirm("Are you sure you want to delete all books?")) {
    localStorage.removeItem("books");
    books = [];
    showBook();
    alert("All books deleted successfully");
    updateBookCount();
  }
}

// function showBook() {
//   let newBookHtml = "";
//   for (let i = 0; i < books.length; i++) {
//     newBookHtml += `
//                             <div class="book">
//                             <img id="myFile" src="${books[i].photo}" alt="${books[i].title}">
//                             <div class="text">
//                                 <h2 id="name">${books[i].title}</h2>
//                                 <p id="author"><strong>Author:</strong> ${books[i].author}</p>
//                                 <p id="cat" ><strong>Category:</strong> ${books[i].genre}</p>
//                                 <p id="date"><strong>Published:</strong> ${books[i].published}</p>
//                                 <p id="isbn"><strong>ISBN:</strong> ${books[i].ISBN}</p>
//                                 <p id="description"><strong>Description:</strong> ${books[i].description}</p>
//                                 <div align="center">
//                                 <button id="delete" type="button" onclick="deleteBook(${i})");">Delete Book</button>
//                                 <button class="update" type="button" onclick="updateBook(${i})">Update Book</button>

//                                 </div>
//                             </div>
//                             </div>
//                              `;
//   }
//   const bookContainer = document.getElementById("list");
//   bookContainer.innerHTML = newBookHtml;
//   updateBookCount();
// }

function updateBookCount() {
  document.getElementById("deleteAll").innerHTML =
    "Delete All Books (" + countBook() + ")";
}
function countBook() {
  return books.length;
}

const submit = document.getElementById("submit");
const id = document.getElementById("id");
const name = document.getElementById("name");
const author = document.getElementById("author");
const genre = document.getElementById("cat");
const description = document.getElementById("description");
const published = document.getElementById("date");
const ISBN = document.getElementById("isbn");
const price = document.getElementById("price");
const photo = document.getElementById("myFile");
let operation;

function updateBook(i) {
  // Construct the URL with parameters
  const url = `/books/admin/update_book/?id=${
    books[i].id
  }&title=${encodeURIComponent(books[i].title)}&author=${encodeURIComponent(
    books[i].author
  )}&genre=${encodeURIComponent(
    books[i].genre
  )}&description=${encodeURIComponent(books[i].description)}&published=${
    books[i].published
  }&ISBN=${books[i].ISBN}&price=${books[i].price}&photo=${encodeURIComponent(
    books[i].photo
  )}&index=${i}`;

  // Redirect to the new URL
  window.location.href = url;
}

function searchBooks() {
  let input = document.querySelector(".search-input");
  let filter = input.value.toUpperCase();
  let books = document.querySelectorAll(".book");
  let selector = document.querySelector("#searchBook");

  books.forEach((book) => {
    let title = book.querySelector("#name").innerText.toUpperCase();
    let category = book.querySelector("#cat").innerText.toUpperCase();

    let author = book.querySelector("#author").innerText.toUpperCase();

    if (selector.value == "title") {
      if (title.includes(filter)) {
        book.style.display = "";
      } else {
        book.style.display = "none";
      }
    } else if (selector.value == "author") {
      if (author.includes(filter)) {
        book.style.display = "";
      } else {
        book.style.display = "none";
      }
    } else if (selector.value == "category") {
      if (category.includes(filter)) {
        book.style.display = "";
      } else {
        book.style.display = "none";
      }
    } else {
      if (
        category.includes(filter) ||
        author.includes(filter) ||
        title.includes(filter)
      ) {
        book.style.display = "";
      } else {
        book.style.display = "none";
      }
    }
  });
}
