let books = [];

function addBook(book){
    let table = $("#bookTable tbody");
    table.append(`
        <tr id="${book.id}">
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.year}</td>
            <td>${book.quantity}</td>
            <td>
            <button class="mb-1 btn btn-sm btn-warning editBtn" data-id="${book.id}">
             Edit
            </button>

            <button class="mb-1 btn btn-sm btn-danger deleteBtn" data-id="${book.id}">
             Delete
            </button>
            </td>
        
    `);
}

function clearForm(){
    $("#bookTitle").val("");
    $("#author").val("");
    $("#genre").val("");
    $("#year").val("");
    $("#quantity").val("");
}

function generateId(){
    return Math.floor(Math.random() * 1000000);
}

$(document).on("click", "#clearBtn", function (){
    clearForm();
});

// Clear all books when "Clear All" button is clicked
$(document).on("click", "#clearBtn", function() {
    if (confirm("Are you sure you want to clear all books?")) {
        books = []; // Clear the books array
        $("#bookTable tbody").empty(); // Clear all rows from the table
    }
});


$("#bookForm").submit(function(e){
    e.preventDefault();

    let book = {
        id:generateId(),
        title:$("#bookTitle").val(),
        author:$("#author").val(),
        genre:$("#genre").val(),
        year:$("#year").val(),
        quantity:$("#quantity").val(),
    };

    books.push(book);
    addBook(book);

    clearForm();
});

$("#editForm").submit(function(e){
    e.preventDefault();

    let bookId = $("#editBookId").val();
    let bookIndex = books.findIndex((book)=>book.id == bookId);

    let book = books[bookIndex];

    book.title = $("#editBookTitle").val();
    book.author = $("#editAuthor").val();
    book.genre = $("#editGenre").val();
    book.year = $("#editYear").val();
    book.quantity = $("#editQuantity").val();

    let row = $(`#${book.id}`);
    row.find("td:eq(0)").text(book.title);
    row.find("td:eq(1)").text(book.author);
    row.find("td:eq(2)").text(book.genre);
    row.find("td:eq(3)").text(book.year);
    row.find("td:eq(4)").text(book.quantity);

    $("#editModal").modal("hide");
});

$(document).on("click", ".editBtn", function() {
    let bookId = $(this).data("id");

    let bookIndex = books.findIndex((book) => book.id == bookId);
    let book = books[bookIndex];

    $("#editBookTitle").val(book.title);
    $("#editAuthor").val(book.author);
    $("#editGenre").val(book.genre);
    $("#editYear").val(book.year);
    $("#editQuantity").val(book.quantity); 
    $("#editBookId").val(book.id);

    $("#editModal").modal("show");
});

$(document).on("click", "#clsBtn", function() {
    
       $("#editModal").modal("hide");
});

$(document).on("click", ".deleteBtn", function() {
    let bookId = $("#editBookId").val();
    let bookIndex = books.findIndex((book)=>book.id == bookId);

    let book = books[bookIndex];

    if (confirm(`Are you sure you want to delete this "${book.title} book"?`)){
        books.splice(bookIndex,1);
        $(`#${book.id}`).remove();
    }
    
});