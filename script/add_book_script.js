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
function AddBook(event) {
    event.preventDefault();

    let Book_Name = document.getElementById("Book_Name");
    let Book_ID = document.getElementById("Book_ID");
    let Book_Author = document.getElementById("Author");
    let checkedCategories = [];
    let checkboxes = document.getElementsByName("checklist");
    let Book_Discription = document.getElementById("book_description");
    let Book_Poster = document.getElementById("file").files[0];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCategories.push(new Category(checkbox.value));
        }
    });

    console.log(Book_Author.value);
    console.log(Book_Discription.value);
    console.log(Book_ID.value);
    console.log(Book_Name.value);

      let reader = new FileReader();

      reader.onload = function(event) {
          let imageData = event.target.result;

          let book = new Book(
              Book_ID.value,
              Book_Name.value,
              Book_Author.value,
              Book_Discription.value,
              imageData,
              checkedCategories
          );
          console.log(book);
          let BookList = JSON.parse(localStorage.getItem("BookList"));
          console.log(BookList);
          BookList.push(book);
          console.log(BookList);  
          localStorage.setItem("BookList", JSON.stringify(BookList));
      }
      reader.readAsDataURL(Book_Poster);
}

document.getElementById("add").addEventListener("click", AddBook);