class Category {
    constructor(name) {
        this.name = name;
    }
}

class Book {
    constructor(id, name, author, description, imageData, categories = []) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.description = description;
        this.imageData = imageData; 
        this.categories = categories;
    }

    addCategory(category) {
        this.categories.push(category);
    }

    removeCategory(categoryName) {
        this.categories = this.categories.filter(category => category.name !== categoryName);
    }
}


let Control_Your_Mind_and_Master_Your_Feelings = new Book(
    1,
    "Control Your Mind and Master Your Feelings",
    "Eric Robertson",
    "This book contains two manuscripts designed to help you discover the best and most efficient way to control your thoughts and master your feelings.",
    "assets/trendingBooks/controlYourMind.png",
    [new Category("psychology")]
)
let Twisted_Game = new Book(
    2,
    "Twisted Games",
    "Ana Huang",
    "Regal, strong-willed, and bound by the chains of duty, Princess Bridget dreams of the freedom to live and love as she chooses. But when her brother abdicates, she's suddenly faced with the prospect of a loveless, politically expedient marriage and a throne she never wanted.",
    "assets/trendingBooks/TwistedGames.png",
    [new Category("romance"), new Category("fiction")]
)
let Game_Of_Thrones = new Book(
    3,
    "Game of Thrones",
    "George R. R. Martin",
    "In a world where seasons can last for years, the noble families of Westeros play a deadly game of politics and power, each plotting to claim the Iron Throne and rule the Seven Kingdoms. Amidst the scheming and warfare, dark forces from beyond the Wall threaten to invade and destroy everything.",
    "assets/trendingBooks/GameOfThrones.png",
    [new Category("science fiction"), new Category("fiction"), new Category("adventure")]
)
let Forty_Eight_Laws_Of_Power = new Book(
    4,
    "48 Laws of Power",
    "Robert Greene",
    "provocative guide to the dynamics of power, offering timeless strategies and tactics based on historical examples, designed to help readers navigate and manipulate social and professional situations.",
    "assets/trendingBooks/48_Laws_of_Power_Book_Cover.png",
    [new Category("psychology"), new Category("buisness"), new Category("history")]
)
let Twisted_Lies = new Book(
    5,
    "Twisted Lies",
    "Ana Huang",
    "Twisted Lies is a suspenseful thriller that unravels the dark secrets and betrayals within a seemingly perfect family, leading to unexpected twists and revelations.",
    "assets/trendingBooks/TwistedLies.png",
    [new Category("fiction"), new Category("romance")]
)
let Read_People_Like_A_Book = new Book(
    6,
    "Read People Like A Book",
    "Patrick King",
    "Read People Like a Book by Patrick King offers practical insights and techniques to improve your understanding of human behavior, helping you decode body language, emotions, and motivations for better communication and relationships.",
    "assets/trendingBooks/ReadPeopleLikeABook.png",
    [new Category("psychology"), new Category("buisness")]
)

let BookList = [
    Control_Your_Mind_and_Master_Your_Feelings,
    Twisted_Game,
    Game_Of_Thrones,
    Forty_Eight_Laws_Of_Power,
    Twisted_Lies,
    Read_People_Like_A_Book
];

localStorage.setItem("BookList",JSON.stringify(BookList))

let startIndex = 0;

function displayBooks(startIndex) {

    let elements = document.querySelectorAll(".Book-item");
    elements.forEach((element) => {
        element.remove();
    });

    let endIndex = startIndex + 4;
    let LSBookList = JSON.parse(localStorage.getItem("BookList"));

    for (let i = startIndex; i < endIndex && i < LSBookList.length; i++) {
        let bookData = LSBookList[i];
        let bookContainer = document.getElementById("kkk");


        let bookItem = document.createElement('div');
        bookItem.className = 'Book-item';

        let bookCover = document.createElement('div');
        bookCover.className = 'book-cover';

        let bookLink = document.createElement('a');
        bookLink.href = 'Book_Details.html';
        bookLink.className = "bookLink";
        bookLink.id = bookData.name;

        let bookImage = document.createElement('img');
        bookImage.className = 'bookcover';
        bookImage.loading = 'lazy';
        bookImage.src = bookData.imageData;
        bookImage.alt = bookData.name;

        bookLink.appendChild(bookImage);
        bookCover.appendChild(bookLink);

        let bookCs = document.createElement('div');
        bookCs.className = 'Book-cs';

        let borrowButton = document.createElement('button');
        borrowButton.className = 'cs-btn';
        borrowButton.id = `cs-btn`;
        borrowButton.textContent = 'Borrow';

        bookCs.appendChild(borrowButton);

        bookItem.appendChild(bookCover);
        bookItem.appendChild(bookCs);

        bookContainer.appendChild(bookItem);
    }
}

displayBooks(startIndex);

document.addEventListener("DOMContentLoaded", function() {
    const bookLinks = document.querySelectorAll(".bookLink");
    let is_Admin = JSON.parse(localStorage.getItem("is_Admin"));

    bookLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            const image = link.querySelector("img");
            const altText = image.alt;
            event.preventDefault();
            window.location.href = `Book_Details.html?bookTitle=${encodeURIComponent(altText)}`;
        });
    });

    if(is_Admin){
        let borrow_btn_display = document.querySelectorAll(".cs-btn");
        borrow_btn_display.forEach(btn => {
            btn.style.display = 'none';
        })
    }
});
document.getElementById('go-back').addEventListener('click', function() {
    goBack();
    const bookLinks = document.querySelectorAll(".bookLink");
    console.log(bookLinks);

    bookLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            const image = link.querySelector("img");
            const altText = image.alt;
            event.preventDefault();
            window.location.href = `Book_Details.html?bookTitle=${encodeURIComponent(altText)}`;
        });
    });
});
document.getElementById('go-front').addEventListener('click', function() {
    goFront();
    const bookLinks = document.querySelectorAll(".bookLink");
    console.log(bookLinks);

    bookLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            const image = link.querySelector("img");
            const altText = image.alt;
            event.preventDefault();
            window.location.href = `Book_Details.html?bookTitle=${encodeURIComponent(altText)}`;
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const borrow_btns = document.querySelectorAll(".cs-btn");

    borrow_btns.forEach(btn => {
        btn.addEventListener("click", function(event) {
            const Book_name = btn.parentElement.previousElementSibling.querySelector('.bookLink').id;
            event.preventDefault();
            window.location.href = `borrow_book.html?bookTitle=${encodeURIComponent(Book_name)}`;
        });
    });
});


function goFront() {
    let LSBookList = JSON.parse(localStorage.getItem("BookList"));
    if (startIndex + 4 < LSBookList.length) {
        startIndex += 4;
        displayBooks(startIndex);
    }
}

function goBack() {
    if (startIndex >= 4) {
        startIndex -= 4;
        displayBooks(startIndex);
    }
}

document.getElementById("profile-button").addEventListener("click", function(){
    window.location.href = 'User_Profile.html';
})

