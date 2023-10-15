let name = document.getElementById("name"); 
let email = document.getElementById('email');
let dob = document.getElementById("dob");
let gender = document.getElementsByName("gender");  
let password = document.getElementById('password');
let confirmPass = document.getElementById('confirmPassword');
let matchedPassword =document.getElementById("matchedPassword");

let pattern = /^[A-Za-z0-9]{7,14}$/;  
let nameRegex = /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/; 
let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let DateRegex = /1[8-9]|[2-7][0-9]|8[0]/;


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
        console.log('CheckNameEmpty');
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
        console.log('CheckNamePattern');

        return true; 

    }
} 

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
        console.log('CheckEmailEmpty');

        return true; 
 
    }
}

function CheckEmailPattern()
{
    if(email.value!="" && !regexEmail.test(email.value))
    {
        document.getElementById('emailValidation').classList.replace('d-none' , 'd-block') 
        document.getElementById('emailEmptyValidation').classList.replace('d-block' , 'd-none')
        email.classList.remove("is-valid");
        email.classList.add("is-invalid");
        return false;
 
    }
       
    else if(regexEmail.test(email.value))
    {
        document.getElementById('emailValidation').classList.replace('d-block' , 'd-none')
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
        console.log('CheckEmailPattern');

        return true; 
     
    }

} 

function GetAge(birthdate) {
    let startDate = new Date(new Date(birthdate));
    const endingDate = new Date().toISOString(); // YYYY-MM-DD
    let endDate = new Date(endingDate);
    if (startDate > endDate) {
      const swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    const startYear = startDate.getFullYear();
  
    // Leap years
    const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    let dayDiff = endDate.getDate() - startDate.getDate();
  
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
  
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }
  
    return {
      years: yearDiff,
      months: monthDiff,
      days: dayDiff,
    };
  } 


function CheckAgeFromDatePattern(){ 
    var date = GetAge(dob.value); 
    var ageInYears = date.years;  

    if(!DateRegex.test(ageInYears)){   
        dob.classList.add("is-invalid"); 
        dob.classList.remove("is-valid");
        document.getElementById("dobError").classList.replace("d-none","d-block"); 
        return false;
    } 
    else{   
        dob.classList.add("is-valid"); 
        dob.classList.remove("is-invalid");
        document.getElementById("dobError").classList.replace("d-block","d-none"); 
        console.log('CheckAgeFromDatePattern');

        return true;
    }
}

function CheckGenderEmpty(){    
    if(gender[0].checked || gender[1].checked){ 
        document.getElementById("genderEmpty").classList.replace("d-block","d-none"); 
        console.log('CheckGenderEmpty');

        return true;
    }   
    else{ 
        document.getElementById("genderEmpty").classList.replace("d-none","d-block"); 
        return false;
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
        console.log('CheckPasswordEmpty');

        return true; 
     
    }
}

function CheckPasswordPattern()
{
    if(!pattern.test(password.value) && password.value!="" )
    {
        document.getElementById('passwordValidation').classList.replace('d-none' , 'd-block')
        password.classList.add("is-invalid"); 
        password.classList.remove("is-valid");
        return false;

    }
    else if(pattern.test(password.value)){
        document.getElementById('passwordValidation').classList.replace('d-block' , 'd-none')
        password.classList.add("is-valid"); 
        password.classList.remove("is-invalid");
        console.log('CheckPasswordPattern');

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

function CheckConfirmPasswordMatch() {
    if (confirmPass.value != password.value && confirmPass.value != "") {
      document.getElementById('confirmPasswordValidation').classList.replace('d-block', 'd-none')
      confirmPass.classList.add("is-invalid");
      confirmPass.classList.remove("is-valid");
      matchedPassword.classList.add("d-block");
      matchedPassword.classList.remove("d-none");
      return false

    } else if (confirmPass.value == password.value && confirmPass.value != "") {
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
  email.addEventListener("blur",function(){ 
    CheckEmailEmpty();
    CheckEmailPattern();
  })
  dob.addEventListener("blur", function(){ 
    CheckAgeFromDatePattern();
  })
  for(let i=0 ; i<gender.length;i++){ 
    gender[i].addEventListener("blur",function(){ 
        CheckGenderEmpty();
      })
  } 
  password.addEventListener("blur",function(){ 
    CheckPasswordEmpty();
    CheckPasswordPattern();
  }) 
  confirmPass.addEventListener("blur",function(){
    CheckConfirmPasswordEmpty();
    CheckConfirmPasswordMatch();  
  }); 

// function submitForm(){   
//     if(!CheckNameEmpty() && !CheckNamePattern() && !CheckAgeFromDatePattern && !CheckEmailEmpty() && !CheckEmailPattern() && !CheckPasswordEmpty() && !CheckPasswordPattern() && !CheckConfirmPasswordEmpty() && !CheckConfirmPasswordMatch()){
//         event.preventDefault();
//     }
//     else {
//        console.log('TEST')
//         return true;
//     }
// }


function submitFormVal(event) { 
  let isPasswordEmptyValid = CheckPasswordEmpty();
  let isAgeFromDatePatternValid = CheckAgeFromDatePattern();
  let isCheckNameEmptyValid = CheckNameEmpty();
  let isConfirmPasswordEmptyValid = CheckConfirmPasswordEmpty();
  let isConfirmPasswordMatchValid = CheckConfirmPasswordMatch();

  let isCheckNamePatternValid = CheckNamePattern();
  let isCheckEmailEmptyValid = CheckEmailEmpty();
  let isCheckEmailPatternValid = CheckEmailPattern();
  let isCheckGenderEmptyValid = CheckGenderEmpty();
  let isCheckPasswordPatternValid = CheckPasswordPattern();

  if (isPasswordEmptyValid && isAgeFromDatePatternValid && isCheckNameEmptyValid && isConfirmPasswordEmptyValid && isConfirmPasswordMatchValid && isCheckNamePatternValid && isCheckEmailEmptyValid && isCheckEmailPatternValid && isCheckGenderEmptyValid&& isCheckPasswordPatternValid) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

document.getElementById('submitForm').addEventListener("submit", function(eventInfo){ 
  submitFormVal(eventInfo);
});