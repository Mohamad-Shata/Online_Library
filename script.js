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
    console.log(Book_Poster);

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
      };

      reader.readAsDataURL(Book_Poster);
}

document.getElementById("add").addEventListener("click", AddBook);


document.getElementById("Login").addEventListener("click", function () {
    document.getElementById("logPop").classList.remove("loghidden");
});


document.getElementById("logclose").addEventListener("click", function () {
    document.getElementById("logPop").classList.add("loghidden");
});


document.getElementById("Signup").addEventListener("click", function () {
    document.getElementById("signPop").classList.remove("signhidden");
});


document.getElementById("signclose").addEventListener("click", function () {
    document.getElementById("signPop").classList.add("signhidden");
});




























// document.getElementById('myform').addEventListener('submit', function(event) {
//     event.preventDefault(); 
    
    
//     const formData = {
//       name: document.getElementById('email-Signup').value,
//       email: document.getElementById('pass-Signup').value
//     };
    
    
//     const jsonData = JSON.stringify(formData);
    
//     localStorage.setItem('formData', jsonData);
    
//     alert('Form data saved successfully!');
// });







// document.addEventListener('DOMContentLoaded', function() {
//   const authForm = document.getElementById('signPop');
//   const signupForm = document.getElementById('myform"');
//   const adminFeatures = document.querySelector('.addBook');
//   const nonAdminFeatures = document.querySelector('.Borrow');
//   const profileButton = document.querySelector('.profile-button');
//   const loginButton = document.getElementById('Signup-btn');

//   // Check if user is authenticated
//   const isAuthenticated = localStorage.getItem('authenticated') === 'true';
//   if (isAuthenticated) {
//     // User is authenticated
//     authForm.style.display = 'none';
//     profileButton.style.display = 'block';
//     adminFeatures.style.display = isAdmin() ? 'block' : 'none';
//     nonAdminFeatures.style.display = isAdmin() ? 'none' : 'block';
//   } else {
//     // User is not authenticated
//     profileButton.style.display = 'none';
//     adminFeatures.style.display = 'none';
//     nonAdminFeatures.style.display = 'none';
//     loginButton.style.display = 'block';
//   }

//   // Handle signup form submission
//   signupForm.addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     const isAdmin = isAdminCheckbox.checked;
//     // Simulate authentication (for demonstration purposes)
//     const authenticated = username === 'admin' && password === 'password';
//     if (authenticated) {
//       localStorage.setItem('authenticated', 'true');
//       localStorage.setItem('isAdmin', isAdmin);
//       authForm.style.display = 'none';
//       profileButton.style.display = 'block';
//       adminFeatures.style.display = isAdmin ? 'block' : 'none';
//       nonAdminFeatures.style.display = isAdmin ? 'none' : 'block';
//     } else {
//       alert('Invalid credentials. Please try again.');
//     }
//   });

//   // Handle profile button click
//   profileButton.addEventListener('click', function() {
//     // Display user profile (replace with your own logic)
//     alert('Viewing profile...');
//   });

//   // Check if user is an admin
//   function isAdmin() {
//     return localStorage.getItem('isAdmin') === 'true';
//   }
// });
