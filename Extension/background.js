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


//gets logged when extension is installed
// chrome.runtime.onInstalled.addListener(function(){
//   console.log("Child Safety extension installed ");
// });


// //this is when the child opens a new tab
// chrome.tabs.onActivated.addListener(function(activeInfo){
//   captureScreenshot();
// });

// //this injects a script 
// //so whn the child scrolls functions gets called
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (changeInfo.status === "complete") {
//     chrome.scripting.executeScript({
//       target: { tabId: tabId },
//       function: function() {
//         window.addEventListener("scroll", function() {
//           chrome.runtime.sendMessage({ event: "scroll" });
//         });
//       }
//     });
//   }
// });

// //this receives the message from above and sends it this
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//   if(request.event === "scroll"){
//     captureScreenshot();
//   }
// });

// //for inactivity
// chrome.idle.setDetectionInterval(60);
// chrome.idle.onStateChanged.addListener(function(state){
//   if(state === "idle" || state === "locked"){
//     captureScreenshot();
//   }
// });
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureScreenshot") {
      captureScreenshot();
  }
});


async function captureScreenshot() {
  let image = await chrome.tabs.captureVisibleTab(null, { format: "png" });
  console.log(image);
  sendToBackend(image);
}

// function dataURLToBlob(dataURL) {  
//   let parts = dataURL.split(','); 
//   let mime = parts[0].match(/:(.*?);/)[1]; 
//   let byteString = atob(parts[1]); 
//   let arrayBuffer = new ArrayBuffer(byteString.length);
//   let uint8Array = new Uint8Array(arrayBuffer);

//   for (let i = 0; i < byteString.length; i++) {
//       uint8Array[i] = byteString.charCodeAt(i);
//   }

//   return new Blob([uint8Array], { type: mime });
// }

async function sendToBackend(imageData) {
  // let blob = dataURLToBlob(imageData); // Convert Base64 to Blob
  try {
    let response = await fetch("http://localhost:8000/validate", {
      method: "POST",
      headers: { "Content-Type": "image/png" },
      body: imageData     // Convert image to blob
    });

    let data = await response.json();
    console.log("Backend Response:", data);

    // If flagged as inappropriate, take action
    if (!data.result) {
      // In Manifest V3, we need to use chrome.runtime.sendMessage to communicate
      chrome.runtime.sendMessage({ action: "show_warning", reason: data.reason });
      
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