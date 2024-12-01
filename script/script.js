document.addEventListener("DOMContentLoaded", function(){
  
  let is_LoggedIn = JSON.parse(localStorage.getItem("is_LoggedIn"))
  let is_Admin = JSON.parse(localStorage.getItem("is_Admin"))
  

  const add_book_nav_button = document.getElementById("addBook");
  if (is_Admin){
    add_book_nav_button.style.display = "flex";
  } else {
    add_book_nav_button.style.display = "none";
  }
  document.getElementById("profile-button").addEventListener('click', function(){
    window.location.href = "User_Profile.html";
  })

  if(is_LoggedIn){
    document.getElementById("Login").style.display = "none";
    document.getElementById("Signup").style.display = "none";
    document.getElementById("profile-button").style.display = "block";
    document.getElementById("Logout").style.display = "block";
  }
  
  document.getElementById("Logout").addEventListener('click', function(){
    localStorage.setItem("is_LoggedIn", "false");
    window.location.reload();
  })

})

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
  
  
  
  document.getElementById("pass_Signup").addEventListener("input", function () {
    var isValid = this.checkValidity();
    document.getElementById("Signup-btn").disabled = !isValid;
  })
  
  document.getElementById("email_Signup").addEventListener("input", function () {
    var emailIsValid = this.checkValidity();
    document.getElementById("Signup-btn").disabled = !emailIsValid;
  })

  
  
  
function checkPasswordMatch() {
    var password = document.getElementById("pass_Signup").value;
    var confirmPassword = document.getElementById("Re-pass").value;
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }
    return true;
  }
  
  

  document.getElementById("Signup-btn").addEventListener("click", function signUp(event) {
    event.preventDefault();
    if (!checkPasswordMatch()) {
        return false;
    }
  
    if(document.getElementById("pass_Signup").checkValidity() && document.getElementById("email_Signup").checkValidity()){

      let Username = document.getElementById('Username_Signup').value;
      let email = document.getElementById('email_Signup').value;
      let pass = document.getElementById('pass_Signup').value;
      let is_admin = document.getElementById("isAdmin").checked;

      let Signup_credentials = {
        Username: Username,
        email: email,
        password: pass,
        is_admin: is_admin
      };

      localStorage.setItem('Signup_credentials', JSON.stringify(Signup_credentials));

      localStorage.setItem("is_LoggedIn", "true");
        
      if(Signup_credentials.is_admin == true){
        localStorage.setItem("is_Admin", true);
      }else{
        localStorage.setItem("is_Admin", false);
      }
    
      alert('Form data saved successfully!');

      document.getElementById("signPop").classList.add("signhidden");
      document.getElementById("Login").style.display = "none";
      document.getElementById("Signup").style.display = "none";
      document.getElementById("profile-button").style.display = "block";
      document.getElementById("Logout").style.display = "block";
      


    }
    return false;
  });
  
  document.getElementById("login-btn").addEventListener("click",   function login(event) {
    event.preventDefault();

    let user = JSON.parse(localStorage.getItem("Signup_credentials"));
    let storedEmail = user.email;
    let storedPassword = user.password;
    let enteredEmail = document.getElementById("email-Login").value;
    let enteredPassword = document.getElementById("pass-Login").value;
  

  
    if (enteredEmail == storedEmail && enteredPassword == storedPassword) {

        document.getElementById("Login").style.display = "none";
        document.getElementById("Signup").style.display = "none";
        document.getElementById("profile-button").style.display = "block";
        document.getElementById("Logout").style.display = "block";
        document.getElementById("logPop").classList.add("loghidden");

        localStorage.setItem("is_LoggedIn", "true");

        if(user.is_admin == true){
          localStorage.setItem("is_Admin", true);
        }else{
          localStorage.setItem("is_Admin", false);
        }
        return false; 
    } else {
        alert("Invalid email or password. Please try again.");
        return false; 
    }
  }
  );


document.getElementById("search-button").addEventListener("click", function (event){
  event.preventDefault();

  let Search = document.getElementById("header_search_bar").value;
  let Search_Criteria = document.getElementById("search_criteria").value;

  window.location.href = `BookList.html?Search=${encodeURIComponent(Search)}&Search_Criteria=${encodeURIComponent(Search_Criteria)}`;

})
