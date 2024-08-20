document.addEventListener("DOMContentLoaded", function () {
  let books;
  books = JSON.parse(localStorage.getItem("books"));

  const app = document.getElementById("list");
  for (let i = 0; i < books.length; i++) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.innerHTML = `
      <img src="${books[i].photo}" alt="${books[i].title}">
      <div class="text">
        <h2 class="book-name" >${books[i].title}</h2>
        <p class="author"><strong>Author:</strong> ${books[i].author}</p>
        <p class="genre"><strong>Category:</strong> ${books[i].genre}</p>
        <p class="book-info" ><strong>Published:</strong> ${books[i].published}</p>
        <p class="book-info" ><strong>ISBN:</strong> ${books[i].ISBN}</p>
        <p class="book-description"><strong>Description:</strong> ${books[i].description}</p>
      </div>
    `;
    app.appendChild(bookElement);
  }

  function countBook() {
    return books.length;
  }

  document.getElementById("itemCount").innerHTML =
    "Total number of items:" + countBook();
});

function searchBooks() {
  let input = document.querySelector(".search-input");
  let filter = input.value.toUpperCase();
  let books = document.querySelectorAll(".book");
  let selector = document.querySelector("#searchBook");

  books.forEach((book) => {
    let title = book.querySelector(".book-name").innerText.toUpperCase();
    let category = book.querySelector(".genre").innerText.toUpperCase();

    let author = book.querySelector(".author").innerText.toUpperCase();

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
