//Get the UI elements
let form = document.querySelector('#book-form');
let bookList = document.querySelector('#book-list');

//Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI Class
class UI {
    static addToBookList(book) {
        let list = document.querySelector("#book-list");
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static clearFields() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }
    static showAlert(msg,className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(msg));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    static delFromBookList(target){
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert("Book Removed!","success");
        }
    }
}
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')==null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static displayBooks(){
        let books = Store.getBooks();
        books.forEach(book=>{
            UI.addToBookList(book);
        });
    }
    static removeBook(isbn){
        let books = Store.getBooks();
        books.forEach((book,i)=>{
            if(book.isbn==isbn){
                books.splice(i,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Adding Event Listener
form.addEventListener('submit', newBook);
bookList.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBooks());

//Define functions
function newBook(e) {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let isbn = document.querySelector("#isbn").value;

    if (title == '' || author == '' || isbn == '') {
        UI.showAlert("Please Fill All the Fields","error");
    } else {
        let book = new Book(title, author, isbn);

        UI.addToBookList(book);
        UI.clearFields();
        UI.showAlert("Successfully Added Book!","success");
        Store.addBook(book);
    }

    e.preventDefault();
}
function removeBook(e){
    UI.delFromBookList(e.target);
    e.preventDefault();
}