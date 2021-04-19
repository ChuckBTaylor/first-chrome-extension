
chrome.runtime.onMessage.addListener(request, sender, sendResponse => {
  console.log("Got message");
  sendResponse({image: "Got it"});
});