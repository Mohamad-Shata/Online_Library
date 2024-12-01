function getQueryStringValue(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

const bookTitle = getQueryStringValue('bookTitle');
let BookTitle = decodeURIComponent(bookTitle);
let BookList = JSON.parse(localStorage.getItem("BookList"));
let Wanted_Book = BookList.find(book => book.name == BookTitle);

document.addEventListener("DOMContentLoaded", function() {


    function loadBookDetails() {

        if (bookTitle) {

            let book_details_img = document.querySelector('.book-details-img');
            book_details_img.src = Wanted_Book.imageData;
            book_details_img.id = Wanted_Book.name;

            let Book_Details_div = document.getElementById("Book-Details");
            Book_Details_div.innerHTML = "";

            let Overview = document.createElement('h1');
            Overview.textContent = 'Overview';
            const hr = document.createElement('hr');

            Book_Details_div.appendChild(Overview);
            Book_Details_div.appendChild(hr);

            let book_details_name_auther = document.createElement('div');
            book_details_name_auther.className = "book-details-name-author";

            Book_Details_div.appendChild(book_details_name_auther);

            let Book_name = document.createElement('h1');
            Book_name.textContent = Wanted_Book.name;
            
            let Author = document.createElement('p');
            Author.textContent = `by ${Wanted_Book.author}`;

            book_details_name_auther.appendChild(Book_name);
            book_details_name_auther.appendChild(Author);

            let book_details_genre = document.createElement('div');
            book_details_genre.className = "book-details-genre";

            Book_Details_div.appendChild(book_details_genre);

            let Genre_title = document.createElement('h3');
            Genre_title.textContent = "Genre";
            let Genre_tags = document.createElement('p');
            Genre_tags.textContent = genre_text_maker(Wanted_Book.categories, "name");

            book_details_genre.appendChild(Genre_title);
            book_details_genre.appendChild(Genre_tags);

            let book_details_description = document.createElement("div");
            book_details_description.className = "book-details-description";

            Book_Details_div.appendChild(book_details_description);

            let description_title = document.createElement("h3");
            description_title.textContent = "Description";
            let description_text = document.createElement('p');
            description_text.textContent = Wanted_Book.description;

            book_details_description. appendChild(description_title);
            book_details_description. appendChild(description_text);
        } else {
            alert('Book title not found.');
        }
    }

    
    let is_Admin = JSON.parse(localStorage.getItem("is_Admin"));

    if(is_Admin){
        document.getElementById('Book_Details_Borrow_btn').style.display = 'none';
    }else{
        document.getElementById('Book_Details_Edit_btn').style.display = 'none';
        document.getElementById('Book_Details_Delete_btn').style.display = 'none';
    }

    loadBookDetails();
});

function genre_text_maker(Categories, name){
    return Categories.map(category => category[name]).join(', ');
}

document.getElementById('Book_Details_Borrow_btn').addEventListener('click', function(){

    window.location.href = `borrow_book.html?bookTitle=${encodeURIComponent(BookTitle)}`;
})

document.getElementById('Book_Details_Edit_btn').addEventListener('click', function(){

    window.location.href = `edit_book.html?bookTitle=${encodeURIComponent(BookTitle)}`;
})
document.getElementById('Book_Details_Delete_btn').addEventListener('click', function(){

    let bookIndex = BookList.findIndex(book => book.name === BookTitle);

    if(bookIndex !== -1){
        let confirmation = confirm("Are you sure you want to delete this book?");

        if(confirmation){
            BookList.splice(bookIndex, 1);

            localStorage.setItem("BookList", JSON.stringify(BookList));
            window.location.href = "BookList.html";
        }else{
            console.log("Deletion Canceled")
        }
    }else{
        console.error("Book not found.");
    }
})



