function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

document.addEventListener('DOMContentLoaded',(event)=>{
    const form=document.getElementById('registration-form')
    const registeredEmail = document.getElementById('registered-email');
    const successMessage = document.getElementById('success-message');
    document.getElementById('submit').addEventListener('click',(event)=>{
        let email=document.getElementById('email-in')
        event.preventDefault()
        if(validateEmail(email.value)){
            chrome.runtime.sendMessage({action:"registered",parentEmail:email.value})
            form.style.display='none';
            successMessage.classList.add('visible');
            registeredEmail.textContent=email;
        }
        else{
            email.classList.add('error')
        }
    })
})