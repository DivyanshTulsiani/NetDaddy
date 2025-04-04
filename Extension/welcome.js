
document.addEventListener('DOMContentLoaded',(event)=>{
    document.getElementById('submit').addEventListener('click',(event)=>{
        let email=document.getElementById('email-in')
        chrome.runtime.sendMessage({action:"registered",parentEmail:email.value})
    })
})