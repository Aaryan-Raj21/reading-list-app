// Student Reading List Application
// Author: Aryan Raj (JECRC University)
// Built with Lecture 11 Defect Fixes & Requirements

const STORAGE_KEY = "aryan_reading_list_books";

let books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { id: 1, title: "Clean Code: A Handbook of Agile Software Craftsmanship", status: "Finished" },
  { id: 2, title: "Introduction to Algorithms (CLRS)", status: "Reading" },
  { id: 3, title: "Designing Data-Intensive Applications", status: "Want to Read" }
];

let currentFilter = "All";

// DOM Elements
const bookForm = document.getElementById("book-form");
const bookTitleInput = document.getElementById("book-title");
const bookStatusInput = document.getElementById("book-status");
const errorMessage = document.getElementById("error-message");
const booksContainer = document.getElementById("books-container");
const emptyState = document.getElementById("empty-state");
const filterButtons = document.querySelectorAll(".filter-btn");

const totalCountEl = document.getElementById("total-count");
const readingCountEl = document.getElementById("reading-count");
const finishedCountEl = document.getElementById("finished-count");

function saveBooks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  updateSummaryCounters();
}

function updateSummaryCounters() {
  const total = books.length;
  const reading = books.filter(b => b.status === "Reading").length;
  const finished = books.filter(b => b.status === "Finished").length;

  totalCountEl.textContent = total;
  readingCountEl.textContent = reading;
  finishedCountEl.textContent = finished;
}

function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.classList.remove("hidden");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

function renderBooks() {
  clearError();
  updateSummaryCounters();

  const filtered = books.filter(book => {
    if (currentFilter === "All") return true;
    return book.status === currentFilter;
  });

  booksContainer.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    filtered.forEach(book => {
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <div class="book-info">
          <h3 class="book-title">${escapeHTML(book.title)}</h3>
        </div>
        <div class="book-actions">
          <select class="status-dropdown" data-id="${book.id}">
            <option value="Want to Read" ${book.status === "Want to Read" ? "selected" : ""}>Want to Read</option>
            <option value="Reading" ${book.status === "Reading" ? "selected" : ""}>Reading</option>
            <option value="Finished" ${book.status === "Finished" ? "selected" : ""}>Finished</option>
          </select>
          <button class="delete-btn" data-id="${book.id}">Delete</button>
        </div>
      `;
      booksContainer.appendChild(card);
    });
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Add Book with Defect Constraints from Lecture 11
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearError();

  const rawTitle = bookTitleInput.value.trim();
  const status = bookStatusInput.value;

  // Defect 2 Fix: 60-Character Limit
  if (rawTitle.length > 60) {
    showError("Book title must be 60 characters or fewer.");
    return;
  }

  // Empty Title Check
  if (rawTitle.length === 0) {
    showError("Please enter a book title.");
    return;
  }

  // Defect 1 Fix: Case-insensitive and whitespace-tolerant duplicate check
  const duplicate = books.some(b => b.title.trim().toLowerCase() === rawTitle.toLowerCase());
  if (duplicate) {
    showError("This book is already in your reading list.");
    return;
  }

  const newBook = {
    id: Date.now(),
    title: rawTitle,
    status: status
  };

  books.unshift(newBook);
  saveBooks();
  renderBooks();
  bookTitleInput.value = "";
  bookTitleInput.focus();
});

// Event Delegation for Status Change & Delete
booksContainer.addEventListener("change", (e) => {
  if (e.target.classList.contains("status-dropdown")) {
    const bookId = Number(e.target.getAttribute("data-id"));
    const newStatus = e.target.value;
    const book = books.find(b => b.id === bookId);
    if (book) {
      book.status = newStatus;
      saveBooks();
      renderBooks();
    }
  }
});

booksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const bookId = Number(e.target.getAttribute("data-id"));
    books = books.filter(b => b.id !== bookId);
    saveBooks();
    renderBooks();
  }
});

// Filter Buttons
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter");
    renderBooks();
  });
});

renderBooks();
