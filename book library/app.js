const books = [];
const history = [];

document.getElementById('addBookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const category = document.getElementById('category').value;
  
  books.push({ title, author, category, borrowed: false });
  alert('Book added successfully!');
  
  document.getElementById('addBookForm').reset();
  displayBooks();
});

function displayBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  books.forEach((book, index) => {
    const bookItem = document.createElement('div');
    bookItem.className = 'book-item';
    bookItem.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} <br>
      <em>Category: ${book.category}</em> <br>
      <button onclick="borrowBook(${index})">${book.borrowed ? 'Return' : 'Borrow'}</button>
    `;
    bookList.appendChild(bookItem);
  });
}

function borrowBook(index) {
  const book = books[index];
  if (book.borrowed) {
    book.borrowed = false;
    const returnDate = new Date();
    history.push(`${book.title} returned on ${returnDate.toDateString()}`);
  } else {
    book.borrowed = true;
    const borrowDate = new Date();
    history.push(`${book.title} borrowed on ${borrowDate.toDateString()}`);
  }
  displayBooks();
  displayHistory();
}

function displayHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  history.forEach(record => {
    const historyItem = document.createElement('li');
    historyItem.textContent = record;
    historyList.appendChild(historyItem);
  });
}

function searchBooks() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(query) || 
    book.author.toLowerCase().includes(query) || 
    book.category.toLowerCase().includes(query)
  );
  
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';
  
  filteredBooks.forEach((book, index) => {
    const bookItem = document.createElement('div');
    bookItem.className = 'book-item';
    bookItem.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} <br>
      <em>Category: ${book.category}</em> <br>
      <button onclick="borrowBook(${index})">${book.borrowed ? 'Return' : 'Borrow'}</button>
    `;
    bookList.appendChild(bookItem);
  });
}

function showSection(sectionId) {
  document.querySelectorAll('main section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}

// Initialize with the library section active
displayBooks();
displayHistory();
