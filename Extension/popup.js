document.addEventListener("DOMContentLoaded", function() {
    let statusElement = document.getElementById("status");
    let warningElement = document.getElementById("warning");
    let container = document.querySelector(".container");
  
    // Check if we have any stored warnings
    chrome.storage.local.get(["warningActive", "warningReason"], function(result) {
      if (result.warningActive) {
        warningElement.style.display = "block";
        
        if (result.warningReason) {
          let reasonText = document.createElement("p");
          reasonText.textContent = "Reason: " + result.warningReason;
          container.appendChild(reasonText);
        }
      }
    });
  
    // Listen for flagged content messages from background.js
    chrome.runtime.onMessage.addListener(function(request) {
      if (request.action === "show_warning") {
        warningElement.style.display = "block";
        
        // Store the warning state
        chrome.storage.local.set({
          warningActive: true,
          warningReason: request.reason
        });
  
        let reasonText = document.createElement("p");
        reasonText.textContent = "Reason: " + request.reason;
        container.appendChild(reasonText);
      }
    });
  
    // Handle close button click
    document.getElementById("close").addEventListener("click", function() {
      window.close();
    });
  
    // Optional: Add a reset button to clear warnings
    const resetButton = document.getElementById("reset");
    if (resetButton) {
      resetButton.addEventListener("click", function() {
        chrome.storage.local.set({
          warningActive: false,
          warningReason: ""
        });
        warningElement.style.display = "none";
        // Remove any reason elements
        const reasonElements = document.querySelectorAll(".container p:not(#status):not(#warning)");
        reasonElements.forEach(el => el.remove());
      });
    }
  });