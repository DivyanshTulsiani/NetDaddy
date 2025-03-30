document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("capture").addEventListener("click", function () {
      console.log('clicked')
      chrome.runtime.sendMessage({ action: "captureScreenshot" });
  });
});
