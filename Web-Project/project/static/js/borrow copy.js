$(document).ready(function () {
  $(".search").submit(function (event) {
    event.preventDefault();
    let query = $("#searchQuery").val().toLowerCase();
    let searchBy = $("#searchBook").val();

    // Send AJAX request to server
    $.ajax({
      url: $(this).attr("action"),
      type: "POST",
      data: {
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        query: query,
        search_by: searchBy,
      },
      dataType: "json",
      success: function (data) {
        $(".type").show();

        $(".book").each(function () {
          let bookTitle = $(this)
            .find(".book-name")
            .text()
            .toLowerCase()
            .trim();
          let bookAuthor = $(this)
            .find(".book-author")
            .text()
            .toLowerCase()
            .trim();
          let shouldHide = true;

          $.each(data.books, function (index, book) {
            if (
              (searchBy == "title" &&
                bookTitle == book.title.toLowerCase().trim()) ||
              (searchBy === "author" &&
                bookAuthor == book.author.toLowerCase().trim()) ||
              (searchBy === "all" &&
                (bookTitle == book.title.toLowerCase().trim() ||
                  bookAuthor == book.author.toLowerCase().trim()))
            ) {
              shouldHide = false;
              return false;
            }
            console.log(bookTitle, book.title.toLowerCase(), shouldHide);
          });

          if (shouldHide) {
            $(this).hide(); // Hide the book
          } else {
            $(this).show(); // Show the book
          }
        });

        // Show or hide categories based on book visibility
        $(".type").each(function () {
          let category = $(this);
          console.log(category);
          let booksInCategory = category.find(".book:visible");
          console.log(booksInCategory.length);

          if (booksInCategory.length === 0) {
            category.hide(); // Hide the category if no books are visible
          } else {
            category.show(); // Show the category if any book is visible
          }
        });
      },

      error: function () {
        // Handle error
        console.error("Error occurred during search");
      },
    });
  });
});

function scrollBooksRight(id) {
  const bookList = document.getElementById(`${id}`);
  bookList.scrollBy({ left: 250, behavior: "smooth" });
}

function scrollBooksLeft(id) {
  const bookList = document.getElementById(`${id}`);
  bookList.scrollBy({ left: -250, behavior: "smooth" });
}


// category

const allBooks = document.getElementById("all");
const fictionBooks = document.getElementById("fiction-books");
const romance = document.getElementById("romance-books");
const thriller = document.getElementById("thriller-books");
const horror = document.getElementById("horror-books");
const kids = document.getElementById("kids-books");
const fantasy = document.getElementById("fantasy-books");
const newBooks = document.getElementById("new-books");

const allButton = document.getElementById("all");
const fictionButton = document.getElementById("fiction");
const romanceButton = document.getElementById("romance");
const thrillerButton = document.getElementById("thriller");
const horrorButton = document.getElementById("horror");
const kidsButton = document.getElementById("kids");
const fantasyButton = document.getElementById("fantasy");
const newBooksButton = document.getElementById("newbut");

allButton.addEventListener("click", () => {
  fictionBooks.style.display = "block";
  romance.style.display = "block";
  thriller.style.display = "block";
  horror.style.display = "block";
  kids.style.display = "block";
  fantasy.style.display = "block";
  const newBooksExists = document
    .getElementById("new-books")
    .querySelector(".book")
    ? true
    : false;
  newBooks.style.display = newBooksExists ? "block" : "none";
});

function hideAll() {
  fictionBooks.style.display = "none";
  romance.style.display = "none";
  thriller.style.display = "none";
  horror.style.display = "none";
  kids.style.display = "none";
  fantasy.style.display = "none";
  newBooks.style.display = "none";
}

fictionButton.addEventListener("click", () => {
  hideAll();
  fictionBooks.style.display = "block";
});

romanceButton.addEventListener("click", () => {
  hideAll();
  romance.style.display = "block";
});

thrillerButton.addEventListener("click", () => {
  hideAll();
  thriller.style.display = "block";
});

horrorButton.addEventListener("click", () => {
  hideAll();
  horror.style.display = "block";
});

kidsButton.addEventListener("click", () => {
  hideAll();
  kids.style.display = "block";
});

fantasyButton.addEventListener("click", () => {
  hideAll();
  fantasy.style.display = "block";
});

newBooksButton.addEventListener("click", () => {
  hideAll();
  // newBooks.style.display = "block";
  const newBooksExists = document
    .getElementById("new-books")
    .querySelector(".book")
    ? true
    : false;
  console.log("test");
  console.log(newBooksExists);
  newBooks.style.display = newBooksExists ? "block" : "none";
});
