let photoBtn = document.getElementById('photoBtn');
let result = document.getElementById('result');
let uploadImage = document.getElementById('uploadImage')
let inputImg = document.getElementById('inputImg')
let alertImage= document.getElementById('alertImage')
let uploadedImage = document.getElementById('uploaded-image');


photoBtn.addEventListener('click' , function(){
    if(inputImg.files.length > 0){
        result.classList.replace('d-none', 'd-block')
        uploadImage.classList.add('d-none')
        alertImage.classList.add('d-none')

        // Display the uploaded image
        const file = inputImg.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
          uploadedImage.src = e.target.result;
        }
        reader.readAsDataURL(file);

        // Send the image to the server for prediction
        const formData = new FormData();
        formData.append('inputImg', file);
        fetch('/upload', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          // Display the prediction result
          const predictionResult = document.getElementById("prediction-result");
          predictionResult.innerHTML = data.prediction;
        })
        .catch(error => console.error(error));


    }
    else
    {
        alertImage.classList.replace('d-none' , 'd-block')
    }
});



const exitIcon = document.getElementById('Exit');

exitIcon.addEventListener('click', () => {
  result.classList.replace('d-block', 'd-none');
  uploadImage.classList.remove('d-none');
  alertImage.classList.add('d-none');
  inputImg.value = '';
});



