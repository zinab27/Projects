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
          let bookTitle = $(this).find(".book-name").text().toLowerCase();
          let bookAuthor = $(this).find(".book-author").text().toLowerCase();
          let shouldHide = true;

          $.each(data.books, function (index, book) {
            if (
              (searchBy === "title" && bookTitle.includes(query)) ||
              (searchBy === "author" && bookAuthor.includes(query)) ||
              (searchBy === "all" &&
                (bookTitle.includes(query) || bookAuthor.includes(query)))
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

        $(".type").each(function () {
          let category = $(this);
          let booksInCategory = category.find(".book");
          let allHidden = true;

          booksInCategory.each(function () {
            if ($(this).is(":visible")) {
              //bshof kol el ktob visible f el category da wla la
              allHidden = false;
              //return false; // Exit the loop early if any book is visible
            } else {
              allHidden = true;
            }
          });

          if (allHidden) {
            category.hide(); // Hide the category
          } else {
            category.show(); // Show the category
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
