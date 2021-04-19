let changeColor = document.getElementById("changeColor");
let pageImage = document.getElementById("largeImage");
let pageText = document.getElementById("sourceText");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getLargestImageSource,
  });

});

function getLargestImageSource() {
  let images = document.getElementsByTagName("img");
  if (images.length === 0) return;

  let image = images[0];

  for (let i = 1; i < images.length; i++) {
    if (!image.width) {
      image = images[i];
    } else if (!!images[i].width && images[i].width > image.width) {
      image = images[i];
    }
  }
  console.log(chrome);
  if (!!image) {
    chrome.tabs.create({url: image.src});
  }
}

// The body of this function will be executed as a content script inside the
// current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }
