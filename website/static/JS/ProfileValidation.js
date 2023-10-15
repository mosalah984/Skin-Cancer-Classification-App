let password = document.getElementById('password');
let newPassword = document.getElementById('newPassword');
let confirmPass = document.getElementById('confirmPassword');
let matchedPassword =document.getElementById("matchedPassword");
var EditBtn = document.getElementById("Edit");
var TrackHistoryBtn = document.getElementById("TrackHistory"); 
var EditPassBtn = document.getElementById("changePass"); 

let pattern = /^[A-Za-z0-9]{7,14}$/;  


let name = document.getElementById('name');

function CheckPasswordEmpty(){ 
  if(password.value=="")
  {
      document.getElementById('passwordEmptyValidation').classList.replace('d-none' , 'd-block'); 
      password.classList.remove("is-valid");
      password.classList.add("is-invalid"); 
      return false;
  }
  else 
  {
      document.getElementById('passwordEmptyValidation').classList.replace('d-block' , 'd-none')
      password.classList.remove("is-invalid");
      password.classList.add("is-valid");
      console.log('CheckPasswordEmpty');
      return true; 
   
  }
}
function CheckNewPasswordEmpty(){ 
  if(newPassword.value=="")
  {
      document.getElementById('newPasswordEmptyValidation').classList.replace('d-none' , 'd-block'); 
      newPassword.classList.remove("is-valid");
      newPassword.classList.add("is-invalid"); 
      return false;
  }
  else 
  {
      document.getElementById('newPasswordEmptyValidation').classList.replace('d-block' , 'd-none')
      newPassword.classList.remove("is-invalid");
      newPassword.classList.add("is-valid");
      console.log('CheckNewPasswordEmpty');
      return true; 
   
  }
}
function CheckConfirmPasswordEmpty(){ 
  if(confirmPass.value=="")
  {
      document.getElementById('confirmPasswordValidation').classList.replace('d-none' , 'd-block')
      matchedPassword.classList.add("d-none");
      confirmPass.classList.add("is-invalid"); 
      confirmPass.classList.remove("is-valid");
      return false;
  } 
  else{ 
      document.getElementById('confirmPasswordValidation').classList.replace('d-block' , 'd-none')
      confirmPass.classList.remove("is-invalid"); 
      confirmPass.classList.add("is-valid");
      console.log('CheckConfirmPasswordEmpty');

      return true;

  }
} 

function CheckNewPasswordPattern()
{
    if(!pattern.test(newPassword.value) && newPassword.value!="" )
    {
        document.getElementById('newPasswordValidation').classList.replace('d-none' , 'd-block')
        newPassword.classList.add("is-invalid"); 
        newPassword.classList.remove("is-valid");
        return false;

    }
    else if(pattern.test(newPassword.value)){
        document.getElementById('newPasswordValidation').classList.replace('d-block' , 'd-none')
        newPassword.classList.add("is-valid"); 
        newPassword.classList.remove("is-invalid");
        console.log('CheckNewPasswordPattern');

        return true; 
    }

}
function CheckConfirmPasswordMatch() {
  if (confirmPass.value != newPassword.value && confirmPass.value != "") {
    document.getElementById('confirmPasswordValidation').classList.replace('d-block', 'd-none')
    confirmPass.classList.add("is-invalid");
    confirmPass.classList.remove("is-valid");
    matchedPassword.classList.add("d-block");
    matchedPassword.classList.remove("d-none");
    return false

  } else if (confirmPass.value == newPassword.value && confirmPass.value != "") {
    document.getElementById('confirmPasswordValidation').classList.replace('d-block', 'd-none')
    confirmPass.classList.add("is-valid");
    confirmPass.classList.remove("is-invalid");
    matchedPassword.classList.add("d-none");
    matchedPassword.classList.remove("d-block");
    console.log('CheckConfirmPasswordMatch');
    return true
  } 
}


name.addEventListener("blur",function(){ 
  CheckNameEmpty();
  CheckNamePattern();
}) 
password.addEventListener("blur",function(){ 
  CheckPasswordEmpty();
}) 

newPassword.addEventListener("blur",function(){ 
  CheckNewPasswordEmpty();
  CheckNewPasswordPattern();
})

confirmPass.addEventListener("blur",function(){
  CheckConfirmPasswordEmpty();
  CheckConfirmPasswordMatch();  
}); 

EditBtn.addEventListener("click",function(){
  document.getElementById("InnerInfoSection").classList.remove("shadow");
  document.getElementById("InfoSection").classList.add("shadow"); 
  EditBtn.classList.add("d-none"); 
  EditPassBtn.classList.add("d-none");
  document.getElementById("EditPersonalDetails").classList.remove("d-none");
document.getElementById("passwordsSection").classList.add("d-none");
  document.getElementById("DetailsSection").classList.remove("d-none");
})
EditPassBtn.addEventListener("click", function(){
  document.getElementById("InnerInfoSection").classList.remove("shadow");
  document.getElementById("InfoSection").classList.add("shadow"); 
  EditBtn.classList.add("d-none"); 
  EditPassBtn.classList.add("d-none"); 
  document.getElementById("EditPersonalDetails").classList.remove("d-none"); 
  document.getElementById("DetailsSection").classList.add("d-none");
  document.getElementById("passwordsSection").classList.replace("d-none","d-block");
})

function validatePasswordForm(event) { 
  let isPasswordEmptyValid = CheckPasswordEmpty();
  let isNewPasswordEmptyValid = CheckNewPasswordEmpty();
  let isNewPasswordPatternValid = CheckNewPasswordPattern();
  let isConfirmPasswordEmptyValid = CheckConfirmPasswordEmpty();
  let isConfirmPasswordMatchValid = CheckConfirmPasswordMatch();

  if (isPasswordEmptyValid && isNewPasswordEmptyValid && isNewPasswordPatternValid && isConfirmPasswordEmptyValid && isConfirmPasswordMatchValid) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

document.getElementById('passwordForm').addEventListener("submit", function(eventInfo){ 
  validatePasswordForm(eventInfo);
});




TrackHistoryBtn.addEventListener("click", function(){ 
  window.location.href = "/history";
})

var cancel_changes = document.getElementById('cancel_changes')

cancel_changes.addEventListener("click",function(){
document.getElementById("EditPersonalDetails").classList.add("d-none")
document.getElementById("InnerInfoSection").classList.add("shadow")
document.getElementById("InfoSection").classList.remove('shadow')
EditBtn.classList.replace('d-none','d-block')
EditPassBtn.classList.replace('d-none','d-block')
  } )




let nameRegex = /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/; 
function CheckNameEmpty(){ 
  if(name.value == ""){ 
      document.getElementById('FullNameEmpty').classList.replace('d-none' , 'd-block') 
      document.getElementById('FullNameLValidation').classList.replace('d-block' , 'd-none');
      name.classList.remove("is-valid");
      name.classList.add("is-invalid");   
      return false;
  } 
  else if(nameRegex.test(name.value)){ 
      document.getElementById('FullNameEmpty').classList.replace('d-block' , 'd-none')
      name.classList.remove("is-invalid");
      name.classList.add("is-valid"); 
      return true; 
  }
} 

function CheckNamePattern(){ 
  if(name.value!="" && !nameRegex.test(name.value))
  {
      document.getElementById('FullNameEmpty').classList.replace('d-block' , 'd-none')
      document.getElementById('FullNameLValidation').classList.replace('d-none' , 'd-block') 
      name.classList.add("is-invalid"); 
      name.classList.remove("is-valid");
      return false;

  }
  else if(nameRegex.test(name.value))
  {
      document.getElementById('FullNameLValidation').classList.replace('d-block' , 'd-none')
      name.classList.remove("is-invalid");
      name.classList.add("is-valid"); 
      return true; 

  }
}

name.addEventListener("blur",function(){ 
  CheckNameEmpty(); 
  CheckNamePattern(); 
}) 


function editFormValidation(event) { 
  let isCheckNameEmptyValid = CheckNameEmpty();
  let isCheckNamePatternValid = CheckNamePattern();


  if (isCheckNameEmptyValid && isCheckNamePatternValid) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

document.getElementById('submitEditForm').addEventListener("submit", function(eventInfo){ 
  editFormValidation(eventInfo);
});