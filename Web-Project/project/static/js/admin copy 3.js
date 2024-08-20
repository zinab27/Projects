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
        $(".book").each(function () {
          let bookTitle = $(this).find("#name").text().toLowerCase();
          let bookAuthor = $(this).find("#author").text().toLowerCase();
          let bookCategory = $(this).find("#cat").text().toLowerCase();
          let shouldHide = true;

          $.each(data.books, function (index, book) {
            let searchQuery = $("#searchQuery").val().toLowerCase();
            let searchBy = $("#searchBook").val();
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
            }
          });

          if (shouldHide) {
            $(this).hide(); // Hide the book
          } else {
            $(this).show(); // Show the book
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
