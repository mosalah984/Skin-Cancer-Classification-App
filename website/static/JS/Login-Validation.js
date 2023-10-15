let email = document.getElementById('email');
let password = document.getElementById('password');

let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function CheckEmailEmpty(){ 
    if(email.value=="")
    {
        document.getElementById('emailEmptyValidation').classList.replace('d-none' , 'd-block')
        document.getElementById('emailValidation').classList.replace('d-block' , 'd-none');
        email.classList.remove("is-valid");
        email.classList.add("is-invalid");  
        return false;

    }
    else if(regexEmail.test(email.value)){
        document.getElementById('emailEmptyValidation').classList.replace('d-block' , 'd-none')
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
        return true; 
 
    }
}


 
function CheckPasswordEmpty(){ 
    if(password.value=="")
    {
        document.getElementById('passwordEmptyValidation').classList.replace('d-none' , 'd-block'); 
        document.getElementById('passwordValidation').classList.replace('d-block' , 'd-none');

        password.classList.remove("is-valid");
        password.classList.add("is-invalid"); 
      
        return false;
    }
       
    else 
    {
        document.getElementById('passwordEmptyValidation').classList.replace('d-block' , 'd-none')
        password.classList.remove("is-invalid");
        password.classList.add("is-valid"); 
        return true;
    
    }
}

email.addEventListener("blur",function(){ 
    CheckEmailEmpty();
  }) 
password.addEventListener("blur",function(){ 
    CheckPasswordEmpty();
  
  }) 

function loginForm()
{
    
    CheckEmailEmpty();
    CheckPasswordEmpty();
    if(!CheckEmailEmpty() &&  !CheckPasswordEmpty()){
        event.preventDefault();
    }
    else {
        return true;
    }
     
}

