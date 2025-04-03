// // content.js
// console.log("SafeX content script loaded");

// // Add scrollend event listener
// document.addEventListener('scrollend', function(event) {
//   console.log("Scrolling has ended!");
  
//   // Send message to background.js when scrolling ends
//   chrome.runtime.sendMessage({
//     action: "scrollEnded",
//     data: {
//       url: window.location.href,
//       scrollPosition: window.scrollY
//     }
//   });
// });





//approach 2

// content.js
console.log("SafeX content script loaded");

let scrollTimeout;
const SCROLL_DELAY = 300; // milliseconds to wait after scrolling stops

// Function to handle scroll events
function handleScroll() {
  // Clear the previous timeout
  clearTimeout(scrollTimeout);
  
  // Set a new timeout
  scrollTimeout = setTimeout(() => {
    console.log("Scrolling has ended!");
    
    // Send message to background.js when scrolling ends
    chrome.runtime.sendMessage({
      action: "scrollEnded",
      data: {
        url: window.location.href,
        scrollPosition: window.scrollY
      }
    });
  }, SCROLL_DELAY);
}

// Add regular scroll event listener
document.addEventListener('scroll', handleScroll);

// Also notify on page load
window.addEventListener('load', () => {
  console.log("Page loaded, sending initial notification");
  chrome.runtime.sendMessage({
    action: "scrollEnded",
    data: {
      url: window.location.href,
      scrollPosition: window.scrollY
    }
  });
});