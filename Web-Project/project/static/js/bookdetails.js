document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");

  stars.forEach(function (star) {
    star.addEventListener("click", function () {
      const rating = this.getAttribute("data-value");
      const ratingContainer = this.parentElement;
      ratingContainer.setAttribute("data-rating", rating);
      updateRating(ratingContainer);
    });
  });
});

function updateRating(ratingContainer) {
  const rating = parseInt(ratingContainer.getAttribute("data-rating"));
  const stars = ratingContainer.querySelectorAll(".star");

  stars.forEach(function (star) {
    const value = parseInt(star.getAttribute("data-value"));
    if (value <= rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

// var availableBooks = JSON.parse(localStorage.getItem("books"));

// // Function to get the value of a URL parameter

// const urlParams = new URLSearchParams(window.location.search);
// const bookTitle = urlParams.get("title").toLowerCase().replaceAll("%20", " ");
// const book = availableBooks.find((b) => b.title.toLowerCase() === bookTitle);

// if (book) {
//   const escapedTitle = book.title.replace(/'/, "'");
//   console.log(escapedTitle);
//   const bookDetailsElement = document.getElementById("book-details");
//   const bookElement = document.createElement("div");
//   bookElement.classList.add("book");
//   bookElement.innerHTML = `
//                 <h2>${book.title}</h2>
//                 <img src="${book.photo}" alt="${book.title}" style="max-width: 180px; display:flex;">
//                 <div class="rating" data-rating="0">
//                     <span class="star" data-value="1">&#9733;</span>
//                     <span class="star" data-value="2">&#9733;</span>
//                     <span class="star" data-value="3">&#9733;</span>
//                     <span class="star" data-value="4">&#9733;</span>
//                     <span class="star" data-value="5">&#9733;</span>
//                   </div>
//                 <p> <strong>Author:</strong> ${book.author}</p>
//                 <p> <strong>Genre:</strong> ${book.genre}</p>
//                 <p> <strong>Published:</strong>  ${book.published}</p>
//                 <p> <strong>ISBN:</strong>  ${book.ISBN}</p>
//                 <p> <strong>Description:</strong>  ${book.description}</p>
//                 <p> <strong>Price:</strong> ${book.price}</p>

//             `;
//   var flag = localStorage.getItem("isLoggedIn");
//   var admin = localStorage.getItem("isAdmin");

//   var borrowNav = document.getElementById("borrow");
//   var myBooksNav = document.getElementById("myBooks");
//   var loginNav = document.getElementById("login");
//   var signupNav = document.getElementById("signup");
//   var logoutNav = document.getElementById("out");
//   var adminNav = document.getElementById("admin");
//   var browseNav = document.getElementById("browse");

//   if (flag == "true" && admin == "true") {
//     loginNav.style.display = "none";
//     signupNav.style.display = "none";
//     myBooksNav.style.display = "none";
//     browseNav.style.display = "none";
//     borrowNav.style.display = "none";
//     adminNav.style.display = "block";
//     logoutNav.style.display = "block";
//   } else if (flag == "true" && admin != "true") {
//     bookElement.innerHTML += `
//                     <button class="borrow-button" onclick="borrowBook('${escapedTitle}')">Borrow</button>
//                 `;
//     loginNav.style.display = "none";
//     signupNav.style.display = "none";
//     browseNav.style.display = "none";
//     adminNav.style.display = "none";
//     logoutNav.style.display = "block";
//     borrowNav.style.display = "block";
//     myBooksNav.style.display = "block";
//   } else {
//     loginNav.style.display = "block";
//     signupNav.style.display = "block";
//     browseNav.style.display = "block";
//     logoutNav.style.display = "none";
//     borrowNav.style.display = "none";
//     myBooksNav.style.display = "none";
//     adminNav.style.display = "none";
//   }

//   console.log(escapedTitle);
//   bookDetailsElement.appendChild(bookElement);
// } else {
//   // Book not found
//   document.write("Book not found.");
// }

// function borrowBook(escapedTitle) {
//   title = escapedTitle.replace(/'/, "'");
//   // Implement borrowing functionality here
//   alert("Borrowing book: " + title);
//   let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
//   // Add the book to the borrowed books array

//   newBook = {
//     title: book.title,
//     author: book.author,
//     genre: book.genre,
//     published: book.published,
//     ISBN: book.ISBN,
//     photo: book.photo,
//     description: book.description,
//     price: book.price,
//   };

//   if (!borrowedBooks.find((b) => b.title === book.title)) {
//     borrowedBooks.push(newBook);
//     // Save the updated borrowed books array back to local storage
//     localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
//   } else {
//     alert("This book is already borrowed");
//   }
// }

function borrowBook(bookTitle) {
  fetch(`/borrow_book/?title=${bookTitle}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to borrow book");
      }
      // Handle success
      alert("Book borrowed successfully!");
    })
    .catch((error) => {
      // Handle error
      console.error("Error borrowing book:", error.message);
    });
}
