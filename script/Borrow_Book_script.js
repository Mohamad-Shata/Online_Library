let BookList = JSON.parse(localStorage.getItem("BookList"));

document.addEventListener("DOMContentLoaded", function() {

    function loadBookDetails() {
        const bookTitle = getQueryStringValue('bookTitle');

        if (bookTitle) {
            let Wanted_Book = BookList.find(book => book.name == bookTitle);
            let Book_to_borrow = document.getElementById("Book_to_borrow");
            Book_to_borrow.innerHTML = "";


            let Borrow_Book_img_Container = document.createElement('div');
            Borrow_Book_img_Container.className = "Borrow_Book_img_Container"
            Book_to_borrow.appendChild(Borrow_Book_img_Container);


            let Borrow_Book_Anchor = document.createElement('a');
            Borrow_Book_Anchor.href = "Book_Details.html";
            Borrow_Book_Anchor.className = "Borrow_Book_Anchor";
            Borrow_Book_Anchor.id = Wanted_Book.name;
            Borrow_Book_img_Container.appendChild(Borrow_Book_Anchor);

            let Borrow_Book_img = document.createElement('img');
            Borrow_Book_img.src = Wanted_Book.imageData;
            Borrow_Book_img.className = "Borrow_Book_img";
            Borrow_Book_Anchor.appendChild(Borrow_Book_img);

            let Borrow_Book_Details = document.createElement('Borrow_Book_Details');
            Borrow_Book_Details.className = "Borrow_Book_Details";
            Book_to_borrow.appendChild(Borrow_Book_Details);

            let Borrow_Book_Title = document.createElement('a');
            Borrow_Book_Title.href = "Book_Details.html";
            Borrow_Book_Title.className = 'Borrow_Book_Title';
            Borrow_Book_Title.textContent = Wanted_Book.name;
            Borrow_Book_Details.appendChild(Borrow_Book_Title);

            let Borrow_Book_Author = document.createElement('p');
            Borrow_Book_Author.className = "Borrow_Book_Author";
            Borrow_Book_Author.textContent = `by: ${Wanted_Book.author}`;
            Borrow_Book_Details.appendChild(Borrow_Book_Author);

            let Borrow_Book_Genre = document.createElement('p');
            Borrow_Book_Genre.className = "Borrow_Book_Genre";
            Borrow_Book_Genre.textContent = `Genre: ${genre_text_maker(Wanted_Book.categories, "name")}`;
            Borrow_Book_Details.appendChild(Borrow_Book_Genre);

        } else {
            alert('Book title not found.');
        }
    }

    loadBookDetails();
});

function genre_text_maker(Categories, name){
    return Categories.map(category => category[name]).join(', ');
}
function getQueryStringValue(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

document.getElementById("Borrow_Book_btn").addEventListener('click', function(){
    
    const bookTitle = getQueryStringValue('bookTitle');
    let Wanted_Book = BookList.find(book => book.name == bookTitle);
    let Date_of_Receive = document.getElementById('Date_of_Recieve').value;
    let Date_of_Return = document.getElementById('Date_of_Return').value;

    if(Wanted_Book && Date_of_Receive && Date_of_Return){
        let Borrowed_Book = {
            Book: Wanted_Book,
            Date_of_Receive: Date_of_Receive,
            Date_of_Return: Date_of_Return
        }
        localStorage.setItem("Borrowed Book", JSON.stringify(Borrowed_Book));
        window.location.href = 'Main.html';
    }
})
