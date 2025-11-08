// js/books.js
async function loadBooks() {
  try {
    // Fetch books from backend API
    const response = await fetch("http://localhost:5000/api/books");
    const books = await response.json();

    const bookList = document.getElementById("book-list");
    const searchInput = document.getElementById("searchInput");

    
    // Display all books
    function displayBooks(filteredBooks) {
      bookList.innerHTML = "";
      filteredBooks.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
          <img src="${book.image}" alt="${book.name}" class="book-img">
          <h3>${book.name}</h3>
          <p class="price">₹${book.price}</p>
          <button class="add-to-cart">Add to Cart</button>
        `;

        bookList.appendChild(bookCard);
      });
    }

    // Initial display
    displayBooks(books);

    // Search filter
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase();
      const filtered = books.filter(b => b.name.toLowerCase().includes(keyword));
      displayBooks(filtered);
    });

  } catch (error) {
    console.error("❌ Error loading books:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadBooks);
