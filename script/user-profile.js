
    
    let storedCredentials = JSON.parse(localStorage.getItem("Signup_credentials"));

    if (storedCredentials) {
        document.getElementById("User_Profile_Username").textContent = `Username: ${storedCredentials.Username}`;
        document.getElementById("User_Profile_Email").textContent = `Email: ${storedCredentials.email}`;
    }
  
    document.addEventListener("DOMContentLoaded", function() {
        let borrowedBook = JSON.parse(localStorage.getItem("Borrowed Book"));
        let borrowedBookContainer = document.getElementById("borrowing_history");
    
        if (borrowedBook) {
    
            let borrowedBookTitle = document.createElement('p');
            borrowedBookTitle.textContent = `Borrowed Book Title: ${borrowedBook.Book.name}`;
            borrowedBookContainer.appendChild(borrowedBookTitle);
    
            let borrowedBookReceiveDate = document.createElement('p');
            borrowedBookReceiveDate.textContent = `Date of Receive: ${borrowedBook.Date_of_Receive}`;
            borrowedBookContainer.appendChild(borrowedBookReceiveDate);
    
            let borrowedBookReturnDate = document.createElement('p');
            borrowedBookReturnDate.textContent = `Date of Return: ${borrowedBook.Date_of_Return}`;
            borrowedBookContainer.appendChild(borrowedBookReturnDate);
        }else{
            let No_Books_Borrowed = document.createElement('p');
            No_Books_Borrowed.textContent = "No books Borrowed Yet!"
            borrowedBookContainer.appendChild(No_Books_Borrowed);
        }
  });