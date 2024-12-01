let BookList = JSON.parse(localStorage.getItem("BookList"));

function displayBooks(BookList){

    let Book_List_div = document.querySelector(".Book_List_All_Books");
    Book_List_div.innerHTML = "";

    BookList.forEach(Book => {
        let Book_List_Item = document.createElement('div');
        Book_List_Item.className = "Book_List_Item";

        Book_List_div.appendChild(Book_List_Item);

        let Book_List_Item_img_Container = document.createElement('span');
        Book_List_Item_img_Container.className = "Book_List_Item_img_Container";

        Book_List_Item.appendChild(Book_List_Item_img_Container);

        let Book_List_Item_anchor = document.createElement('a');
        Book_List_Item_anchor.href = "Book_Details.html";
        Book_List_Item_anchor.className = "bookLink";

        Book_List_Item_img_Container.appendChild(Book_List_Item_anchor);

        let Book_List_Item_img = document.createElement('img');
        Book_List_Item_img.src = Book.imageData;
        Book_List_Item_img.className = "Book_List_Item_img";
        Book_List_Item_img.alt = Book.name;

        Book_List_Item_anchor.appendChild(Book_List_Item_img);

        let Book_List_Item_Details = document.createElement('div');
        Book_List_Item_Details.className = "Book_List_Item_Details";

        Book_List_Item.appendChild(Book_List_Item_Details);

        let Book_List_Item_Title = document.createElement('a');
        Book_List_Item_Title.textContent = Book.name;
        Book_List_Item_Title.href = "Book_Details.html";
        Book_List_Item_Title.className = "textboolink";

        let Book_List_Item_Author = document.createElement('p');
        Book_List_Item_Author.textContent = `by ${Book.author}`;

        let Book_List_Item_Genre = document.createElement('p');
        Book_List_Item_Genre.textContent = `Genre: ${genre_text_maker(Book.categories, "name")}`;

        Book_List_Item_Details.appendChild(Book_List_Item_Title);
        Book_List_Item_Details.appendChild(Book_List_Item_Author);
        Book_List_Item_Details.appendChild(Book_List_Item_Genre);
    });
}

displayBooks(BookList);

document.addEventListener("DOMContentLoaded", function() {
    function getQueryStringValue(key) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    }

    let Search = getQueryStringValue("Search");
    let Search_Criteria = getQueryStringValue("Search_Criteria");

    if(Search && Search_Criteria){
        console.log(Search);
        console.log(Search_Criteria);

        document.getElementById("searchInput").value = Search;

        let radios = document.getElementsByName("Book");
        radios.forEach(radio =>{
            if(radio.value == Search_Criteria){
                radio.checked = true;
            }
        })

        const searchterm = Search.toLowerCase();

        if(Search_Criteria == "Category"){

            const filteredBooks = BookList.filter(book => 
                book.categories.some(category => category.name.toLowerCase().includes(searchterm))
            );
            displayBooks(filteredBooks);
        }else if(Search_Criteria == "Title"){

            const filteredBooks = BookList.filter(book => 
                book.name.toLowerCase().includes(searchterm)
            );
            displayBooks(filteredBooks);
        }else{
            const filteredBooks = BookList.filter(book => 
                book.author.toLowerCase().includes(searchterm)
            );
            displayBooks(filteredBooks);
        }

    
    }else{
        console.log("No Data recieved");
    }
    const bookLinks = document.querySelectorAll(".bookLink");
    const textbookLinks = document.querySelectorAll(".textboolink");

    bookLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            const image = link.querySelector("img");
            const altText = image.alt;
            event.preventDefault();
            window.location.href = `Book_Details.html?bookTitle=${encodeURIComponent(altText)}`;
        });
    });
    textbookLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            let BookTitle = link.textContent;
            event.preventDefault();
            window.location.href = `Book_Details.html?bookTitle=${encodeURIComponent(BookTitle)}`;
        });
    });
});

function genre_text_maker(Categories, name){
    return Categories.map(category => category[name]).join(', ');
}

document.getElementById("Confirm_Search_btn").addEventListener('click', function(){
    
    let Search = document.getElementById('searchInput').value;
    let radios = document.getElementsByName('Book');
    let Search_Criteria;
    radios.forEach(radio => {
        if(radio.checked){
            Search_Criteria = radio.value;
        }
    })
    
    let searchterm = Search.toLowerCase();

    if(Search_Criteria == "Category"){

        const filteredBooks = BookList.filter(book => 
            book.categories.some(category => category.name.toLowerCase().includes(searchterm))
        );
        displayBooks(filteredBooks);
    }else if(Search_Criteria == "Title"){

        const filteredBooks = BookList.filter(book => 
            book.name.toLowerCase().includes(searchterm)
        );
        displayBooks(filteredBooks);
    }else{
        const filteredBooks = BookList.filter(book => 
            book.author.toLowerCase().includes(searchterm)
        );
        displayBooks(filteredBooks);
    }

})