document.addEventListener("DOMContentLoaded", function () {
  function updateVisibleBookCount() {
    const books = document.querySelectorAll(".book");
    const visibleBooks = Array.from(books).filter((book) => {
      return book.style.display !== "none";
    }).length;
    document.getElementById("itemCount").textContent =
      "Total number of books: " + visibleBooks;
  }

  document
    .querySelector(".search")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const query = document
        .getElementById("searchQuery")
        .value.toLowerCase()
        .trim();
      const searchBy = document.getElementById("searchBook").value;
      const csrfToken = document.querySelector(
        'input[name="csrfmiddlewaretoken"]'
      ).value;

      // Create FormData and append necessary fields
      const formData = new FormData();
      formData.append("csrfmiddlewaretoken", csrfToken);
      formData.append("query", query);
      formData.append("search_by", searchBy);

      // Send AJAX request to server
      const xhr = new XMLHttpRequest();
      xhr.open("POST", this.getAttribute("action"), true);

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
          const data = JSON.parse(xhr.responseText);
          const books = document.querySelectorAll(".book");

          books.forEach(function (book) {
            const bookTitle = book
              .querySelector("#name")
              .textContent.toLowerCase()
              .trim();
            const bookAuthor = book
              .querySelector("#author")
              .textContent.toLowerCase()
              .trim();
            const bookCategory = book
              .querySelector("#cat")
              .textContent.toLowerCase()
              .trim();
            let shouldHide = true;

            console.log(data);

            data.books.forEach(function (book) {
              if (
                (searchBy === "title" && bookTitle.includes(query)) ||
                (searchBy === "author" && bookAuthor.includes(query)) ||
                (searchBy === "category" && bookCategory.includes(query)) ||
                (searchBy === "all" &&
                  (bookTitle.includes(query) ||
                    bookAuthor.includes(query) ||
                    bookCategory.includes(query)))
              ) {
                shouldHide = false;
                console.log("bool", bookTitle);
              }
            });

            if (shouldHide) {
              book.style.display = "none"; // Hide the book
            } else {
              book.style.display = ""; // Show the book
            }
          });
          updateVisibleBookCount();
        } else {
          // Handle error
          console.error("Error occurred during search");
        }
      };

      xhr.onerror = function () {
        // Handle error
        console.error("Request error");
      };

      xhr.send(formData);
    });
});
