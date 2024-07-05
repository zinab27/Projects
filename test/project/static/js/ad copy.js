function updateVisibleBookCount() {
  let visibleBooks = $(".book:visible").length;
  $("#itemCount").text("Total number of books: " + visibleBooks);
}

$(document).ready(function () {
  $(".search").submit(function (event) {
    event.preventDefault();
    let query = $("#searchQuery").val().toLowerCase().trim();
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
        $(".book").each(function () {
          let bookTitle = $(this).find("#name").text().toLowerCase().trim();
          let bookAuthor = $(this).find("#author").text().toLowerCase().trim();
          let bookCategory = $(this).find("#cat").text().toLowerCase().trim();
          let shouldHide = true;

          $.each(data.books, function (index, book) {
            // let searchQuery = $("#searchQuery").val().toLowerCase();
            // let searchBy = $("#searchBook").val();
            title = book.title.toLowerCase().trim();
            author = book.author.toLowerCase().trim();
            category = book.genre.toLowerCase().trim();
            console.log(title, author, category);
            console.log(
              bookTitle,
              "     ",
              bookAuthor,
              "       ",
              bookCategory
            );
            if (
              (searchBy === "title" && bookTitle.includes(title)) ||
              (searchBy === "author" && bookAuthor.includes(author)) ||
              (searchBy === "category" && bookCategory.includes(category)) ||
              (searchBy === "all" &&
                (bookTitle.includes(title) ||
                  bookAuthor.includes(author) ||
                  bookCategory.includes(category)))
            ) {
              shouldHide = false;
            }
          });

          if (shouldHide) {
            $(this).hide(); // Hide the book
          } else {
            $(this).show(); // Show the book
          }
        });
        updateVisibleBookCount();
      },

      error: function () {
        // Handle error
        console.error("Error occurred during search");
      },
    });
  });
});
