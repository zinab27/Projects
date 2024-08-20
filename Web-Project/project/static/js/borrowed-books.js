// function resetBorrowedBooks() {
//   localStorage.removeItem("borrowedBooks");
//   location.reload();
// }

// function returnBook(title) {
//   borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
//   borrowedBooks = borrowedBooks.filter((b) => b.title !== title);
//   localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
//   alert("Remove book");
//   location.reload();
// }

function searchBooks() {
  let input = document.querySelector(".search-input");
  let filter = input.value.toUpperCase();
  let books = document.querySelectorAll(".borrowedBook");
  let selector = document.querySelector("#searchBook");

  console.log(books[0], books[1]);

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

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve borrowed books from local storage
  let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

  // Display borrowed books
  let borrowedBooksList = document.getElementById("borrowed-books-list");

  borrowedBooksList.innerHTML = borrowedBooks
    .map(
      (book) => `
            <div class="borrowedBook">
            <h2 id="name">${book.title}</h2>
                <img src="${book.photo}" alt="${book.title}" style="max-width: 180px; display:flex;">
            <p id="author"> <strong>Author:</strong> ${book.author}</p>
                <p id="cat"> <strong>Genre:</strong> ${book.genre}</p>
                <p> <strong>Published:</strong>  ${book.published}</p>
                <p> <strong>ISBN:</strong>  ${book.ISBN}</p>
                <p> <strong>Description:</strong>  ${book.description}</p>
                <p> <strong>Price:</strong> ${book.price}</p>
                <button class="return-button" onclick="returnBook('${book.title}')">Return</button>
                </div>
                `
    )
    .join("");
});

function scrollBooksRight() {
  const bookList = document.getElementById('borrowed-books');
  bookList.scrollBy({ left: 250, behavior: "smooth" });
}

function scrollBooksLeft() {
  const bookList = document.getElementById('borrowed-books');
  bookList.scrollBy({ left: -250, behavior: "smooth" });
}

function returnBook(title) {
  console.log("title: " + title);
  // Send a POST request to the server to borrow the book
  fetch("./returnBook/", {  // Update the URL to match the Django URL configuration
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'), // Get CSRF token from cookies
    },
    body: JSON.stringify({ title: title }),
  })
    .then(response => {
      if (response.ok) {
        alert('Book Returned successfully!');
        location.reload();
      } else {
        alert('Error Returning book.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
}


// Function to get CSRF token from cookies
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.borrow-button.available').forEach(button => {
    button.addEventListener('click', function () {
      const title = this.getAttribute('data-title');
      returnBook(title);
    });
  });
});


// Function to reset (return) all borrowed books
function resetBorrowedBooks() {
  console.log("reset button")
  const borrowedBooks = document.querySelectorAll('.book');
  let titles = [];
  borrowedBooks.forEach(book => {
    const title = book.querySelector(".book-name").innerText.trim();
    titles.push(title)
  });
  resetBooks(titles)
}

// Attach event listener to the reset button
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', resetBorrowedBooks);

function resetBooks(titles) {
  // Send a POST request to the server to borrow the book
  fetch("./resetBooks/", {  // Update the URL to match the Django URL configuration
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'), // Get CSRF token from cookies
    },
    body: JSON.stringify({ titles: titles }),
  })
    .then(response => {
      if (response.ok) {
        alert('All Books Returned successfully!');
        location.reload();
      } else {
        alert('Error Returning books.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
}