//OPERATION GUIDELINE

//we will be using the inbuild features given by chrome so as detect the user making any 
//activity on the screen

//we would then send the request to the backend with a screenshot and would get a 
//suitable respnse from there

//if the response is flagged we would then dynamically change the HTML of the page 
//by doing display:none in body section of the page or any other reasonsable scrapping
//idea 

//this flag request should also send a notification to our mobile email msg or wtsp
//so as the parent side gets informed when the child is exposed to some explicit content

// Gets logged when extension is installed
chrome.runtime.onInstalled.addListener(function(){
  console.log("Child Safety extension installed ");
});

// Keep track of pending screenshot requests to avoid too many at once
let screenshotPending = false;

// Set a reasonable debounce time for screenshots (in milliseconds)
const SCREENSHOT_DEBOUNCE = 1000; // 1 second

// This is when the child opens a new tab
chrome.tabs.onActivated.addListener(function(activeInfo){
  // Add a small delay before capturing to avoid tab transition conflicts
  setTimeout(() => {
    attemptCaptureScreenshot();
  }, 300);
});

// This injects a script so when the child scrolls functions gets called
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && 
      tab.url && 
      !tab.url.startsWith("chrome://") && 
      !tab.url.startsWith("chrome-extension://") &&
      !tab.url.startsWith("edge://") &&
      !tab.url.startsWith("brave://")) {
    
    try {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: function() {
          // Debounce scroll events to avoid excessive processing
          let scrollTimeout;
          window.addEventListener("scroll", function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              chrome.runtime.sendMessage({ event: "scroll" });
            }, 300); // Wait for scrolling to finish
          });
        }
      }).catch(error => {
        console.log("Script injection error:", error.message);
      });
    } catch (error) {
      console.error("Script execution error:", error);
    }
  }
});

// This receives the message from above and sends it this
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.event === "scroll"){
    attemptCaptureScreenshot();
  }
});

// For inactivity
chrome.idle.setDetectionInterval(60);
chrome.idle.onStateChanged.addListener(function(state){
  if(state === "idle" || state === "locked"){
    attemptCaptureScreenshot();
  }
});

// Wrapper function to handle screenshot attempts with debounce
function attemptCaptureScreenshot() {
  if (screenshotPending) {
    return; // Don't stack screenshot attempts
  }
  
  screenshotPending = true;
  
  // Reset the pending flag after the debounce period
  setTimeout(() => {
    screenshotPending = false;
  }, SCREENSHOT_DEBOUNCE);
  
  captureScreenshot();
}

function captureScreenshot(){
  console.log("Starting screenshot capture...");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log("Active tabs:", tabs);
    
    if (!tabs || !tabs[0]) {
      console.error("No active tab found");
      screenshotPending = false;
      return;
    }
    
    const tab = tabs[0];
    console.log("Active tab URL:", tab.url);
    
    // Skip restricted URLs
    if (!tab.url || 
        tab.url.startsWith("chrome://") || 
        tab.url.startsWith("chrome-extension://") ||
        tab.url.startsWith("edge://") ||
        tab.url.startsWith("brave://")) {
      console.log("Skipping restricted URL:", tab.url);
      screenshotPending = false;
      return;
    }
    
    // Wait a moment to ensure tab is ready
    setTimeout(() => {
      console.log("Attempting to capture screenshot...");
      try {
        chrome.tabs.captureVisibleTab(null, {format: "png"}, function(image) {
          // Check for error
          if (chrome.runtime.lastError) {
            console.error("Screenshot error:", chrome.runtime.lastError);
            screenshotPending = false;
            return;
          }
          
          if (image) {
            console.log("Screenshot captured successfully, length:", image.length);
            console.log("Screenshot starts with:", image.substring(0, 50) + "...");
            sendToBackend(image);
          } else {
            console.error("No image captured, result is undefined");
          }
          
          screenshotPending = false;
        });
      } catch (error) {
        console.error("Capture error:", error);
        screenshotPending = false;
      }
    }, 200);
  });
}

function dataURItoBlob(dataURI) {
  // Convert base64/URLEncoded data component to raw binary data
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = decodeURIComponent(dataURI.split(',')[1]);
  }
  
  // Separate the MIME component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
  // Write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  // Create a Blob and return it
  return new Blob([ab], {type: mimeString});
}

// async function sendToBackend(imageData) {
//   try {
//     // Convert the data URI to a Blob
//     const imageBlob = dataURItoBlob(imageData);
//     console.log(imageBlob);
    
//     // Create a FormData object for sending the image
//     // const formData = new FormData();
//     // formData.append('image', imageBlob);
    
//     let response = await fetch("http://localhost:8000/validate", {
//       method: "POST",
//       headers: { 
//         "Content-Type": "image/png"
//       },
//       body: imageBlob
//     });

//     let data = await response.json();
//     console.log("Backend Response:", data);

//     // If flagged as inappropriate, take action
//     if (!data.result) {
//       // In Manifest V3, we need to use chrome.runtime.sendMessage to communicate
//       chrome.runtime.sendMessage({ action: "show_warning", reason: data.reason });
      
//       // Block the content by injecting CSS
//       chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         if (tabs[0] && 
//             !tabs[0].url.startsWith("chrome://") && 
//             !tabs[0].url.startsWith("chrome-extension://") &&
//             !tabs[0].url.startsWith("edge://") &&
//             !tabs[0].url.startsWith("brave://")) {
          
//           try {
//             chrome.scripting.insertCSS({
//               target: { tabId: tabs[0].id },
//               css: "body { display: none !important; }"
//             });
//           } catch (error) {
//             console.error("CSS injection error:", error);
//           }
//         }
//       });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }


async function sendToBackend(imageData) {
  try {
    // Option 1: Extract base64 string from data URL and send directly
    const base64String = imageData.split(',')[1];
    
    let response = await fetch("http://localhost:8000/validate", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image: base64String
      })
    });

    // Alternative Option 2: Keep using Blob approach
    // const imageBlob = dataURItoBlob(imageData);
    // let response = await fetch("http://localhost:8000/validate", {
    //   method: "POST",
    //   headers: { 
    //     "Content-Type": "image/png"
    //   },
    //   body: imageBlob
    // });

    let data = await response.json();
    console.log("Backend Response:", data);

    // If flagged as inappropriate, take action
    if (!data.result) {
      // In Manifest V3, we need to use chrome.runtime.sendMessage to communicate
      chrome.runtime.sendMessage({ action: "show_warning", reason: data.reason });
      
      // Block the content by injecting CSS
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0] && 
            !tabs[0].url.startsWith("chrome://") && 
            !tabs[0].url.startsWith("chrome-extension://") &&
            !tabs[0].url.startsWith("edge://") &&
            !tabs[0].url.startsWith("brave://")) {
          
          try {
            chrome.scripting.insertCSS({
              target: { tabId: tabs[0].id },
              css: "body { display: none !important; }"
            });
          } catch (error) {
            console.error("CSS injection error:", error);
          }
        }
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}