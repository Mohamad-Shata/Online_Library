function getQueryStringValue(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}
let BookTitle = getQueryStringValue('bookTitle');
let BookList = JSON.parse(localStorage.getItem("BookList"));
let Wanted_Book = BookList.find(book => book.name == BookTitle);
document.addEventListener('DOMContentLoaded', function(){
    let checkboxes = document.getElementsByName("checklist");
    let Wanted_Book_Categories = Wanted_Book.categories;

    document.getElementById("Edit_Book_Name").value = Wanted_Book.name;
    document.getElementById("Edit_Book_ID").value = Wanted_Book.id;
    document.getElementById("Edit_Book_Author").value = Wanted_Book.author;
    document.getElementById("Edit_Book_Description").value = Wanted_Book.description;
    checkboxes.forEach(checkbox => {
        for(let category in Wanted_Book_Categories){
            if(Wanted_Book_Categories[category].name === checkbox.value){
                checkbox.checked = true;
                break;
            }
        }
    })
})

document.getElementById("Edit_Book_Submit_btn").addEventListener('click', function(event){
    event.preventDefault();

    let BookIndex = BookList.findIndex(book => book.name === BookTitle);
    let checkboxes = document.getElementsByName("checklist");
    let checkedCategories = [];

    BookList[BookIndex].name = document.getElementById("Edit_Book_Name").value;
    BookList[BookIndex].id = parseInt(document.getElementById("Edit_Book_ID").value);
    BookList[BookIndex].author = document.getElementById("Edit_Book_Author").value;
    BookList[BookIndex].description = document.getElementById("Edit_Book_Description").value;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCategories.push(checkbox.value);
        }
    });
    BookList[BookIndex].categories = checkedCategories;
    
    if(document.getElementById("Edit_Book_File").files[0]){
        BookList[BookIndex].imageData= document.getElementById("Edit_Book_File").files[0];
    }
    localStorage.setItem("BookList", JSON.stringify(BookList));
})