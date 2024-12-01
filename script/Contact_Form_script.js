document.getElementById('Contact_Form_Submit_btn').addEventListener('click', function(){

    let Contact_Form_Name = document.getElementById('Contact_Form_Name').value;
    let Contact_Form_Email = document.getElementById('Contact_Form_Email').value;
    let Contact_Form_Topic = document.getElementById('Contact_Form_Topic').value;
    let Contact_Form_Question = document.getElementById('Contact_Form_Question').value;

    document.getElementById('Contact_Form_Email').addEventListener('input', function(){
        let isValid = this.checkValidity();
        document.getElementById('Contact_Form_Submit_btn').disabled = !isValid;
    })
    let Contact_Form_Info = {
        name: Contact_Form_Name,
        email: Contact_Form_Email,
        topic: Contact_Form_Topic,
        question: Contact_Form_Question
    }
    localStorage.setItem("Contact_Form_Info", JSON.stringify(Contact_Form_Info));
})