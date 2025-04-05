//OPERATION GUIDELINE

//we will be using the inbuild features given by chrome so as detect the user  making any 
//activity on the screen

//we would then send the request to the backend with a screenshot and would get a 
//suitable respnse from there

//if the response is flagged we would then dynamically change the HTML of the page 
//by doing display:none in body section of the page or any other reasonsable scrapping
//idea 

//this flag request should also send a notification to our mobile email msg or wtsp
//so as the parent side gets informed when the child is exposed to some explicit content

//this would be called by event listeners which initself calls the capture screenshot functiuon


chrome.runtime.onInstalled.addListener(function(){
  chrome.tabs.create({
    url : "./welcome.html",
  })
})




//INACTVITY SOLVED
chrome.idle.setDetectionInterval(16); // Set idle time to 15 seconds



chrome.idle.onStateChanged.addListener((newState) => {
    if (newState === "idle") {
        captureScreenshot();
    }
});


// chrome.tabs.onActivated.addListener(function(activeInfo) {
//   captureScreenshot();
// });

chrome.tabs.onCreated.addListener(() => {
  setTimeout(() => captureScreenshot(), 500); // Delay to avoid dragging issue
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
      setTimeout(() => captureScreenshot(), 500);
  }
});


// // Listen for messages from content script, including scrollend events
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   if (message.action === "scrollEnded") {
//     console.log("Scroll ended on page:", message.data.url);
//     captureScreenshot();
//   }
// });


// Add this near the top of your background.js
console.log("Background script loaded");

// Modify your message listener with more logging
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "scrollEnded") {
    console.log("Scroll ended on page:", message.data.url);
    console.log("Calling captureScreenshot()");
    captureScreenshot();
  }
});



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureScreenshot") {
      captureScreenshot();
  }
});
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
  if (request.action === 'registered') {
    chrome.runtime.setUninstallURL(`http://localhost:8000/uninstalled?parentEmail=${request.parentEmail}`);
    chrome.storage.local.set({parentEmail:request.parentEmail},()=>{

    })
  }
})

async function captureScreenshot() {
  let image = await chrome.tabs.captureVisibleTab(null, { format: "png" });
  sendToBackend(image);
}

async function dataURLToBlob(imageData) {
  let res=await fetch(imageData)
  return res.blob()
}

async function sendToBackend(imageData) {
  let blob = await dataURLToBlob(imageData); // Convert Base64 to Blob
  try {
    let response = await fetch("http://localhost:8000/validate", {
      method: "POST",
      headers: { "Content-Type": "image/png" },
      body: blob     // Convert image to blob
    });

    let data = await response.json();

    // If flagged as inappropriate, take action
    if (!data.result) {

      //send message to whatsapp number if content is detected malicious

      await fetch("http://localhost:8000/whatsapp-alert", {
        method: "POST"
      });


      // In Manifest V3, we need to use chrome.runtime.sendMessage to communicate
      // sendWhatsAppAlert(screenshotURL);
      chrome.runtime.sendMessage({ action: "show_warning", reason: data.reason });
      chrome.storage.local.get(['parentEmail'],async (result)=>{
        console.log(result.parentEmail)
        await fetch("http://localhost:8000/notify",{
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body:JSON.stringify({
            parentEmail:result.parentEmail,
            reason:data.reason
          })
        })
      })
      // Optional: Block the content by injecting CSS
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.scripting.insertCSS({
            target: { tabId: tabs[0].id },
            css: "body { display: none !important; }"
          });
        }
      });
    }
  } catch (error) {
      console.error("Error:", error);
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
}
