

document.addEventListener("DOMContentLoaded", function() {
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");
  const bookResults = document.getElementById("bookResults");

  searchButton.addEventListener("click", () => {
      const searchQuery = searchInput.value.trim();

      if (searchQuery) {
          fetchBooks(searchQuery);
      } else {
          bookResults.innerHTML = "<p>Please enter a search query.</p>";
      }
  });

  function fetchBooks(query) {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              displayBooks(data.items);
          })
          .catch(error => {
              bookResults.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
          });
  }

  function displayBooks(books) {
      bookResults.innerHTML = "";

      if (books && books.length > 0) {
          books.forEach(book => {
              const bookInfo = book.volumeInfo;

              const bookCard = document.createElement("div");
              bookCard.classList.add("book-card");

              const bookThumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "placeholder.jpg";
              const bookTitle = bookInfo.title || "No title available";
              const bookAuthor = bookInfo.authors ? bookInfo.authors.join(", ") : "Unknown author";

              bookCard.innerHTML = `
                  <img src="${bookThumbnail}" alt="${bookTitle}">
                  <h3>${bookTitle}</h3>
                  <p>${bookAuthor}</p>
              `;

              bookResults.appendChild(bookCard);
          });
      } else {
          bookResults.innerHTML = "<p>No books found.</p>";
      }
  }
});
