let myLibrary = [];
let newBookButton = document.querySelector(".new-button");
let dialog = document.querySelector("dialog");
let closeDialog = document.querySelector(".close-dialog");
let form = document.querySelector("form");
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let read = document.querySelector("#read");
let table = document.querySelector(".table-container");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  }
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks(library) {
  for (let i = 0; i < library.length; i++) {
    console.log(library[i].info);
  }
}

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary(title.value, author.value, pages.value, read.value);
  dialog.close();
  table.innerHTML = generateTable(myLibrary);
})

function generateTable(library) {
  let table = "<table>";
  let i = 0;
  library.forEach(book => {
    table += `<tr class="${i}"><td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td><button onclick="toggleRead(this)" class="read">${book.read}</button></td><td><button onclick="deleteBook(this)">Delete Book</button></td></tr>`;
    i++;
  });
  table += "</table>";
  return table;
}

function toggleRead(book) {
  if (book.innerHTML === "Read") {
    book.innerHTML = "Not Read";
  } else {
    book.innerHTML = "Read";
  }
  let row = book.parentNode.parentNode;
  myLibrary[row.className].read = book.innerHTML;
}

function deleteBook(book) {
  let row = book.parentNode.parentNode;
  myLibrary.splice(row.className, 1);
  table.innerHTML = generateTable(myLibrary);
}

