let changeColor = document.getElementById("changeColor");
let pageImage = document.getElementById("largeImage");
let pageText = document.getElementById("sourceText");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

console.log("button: ", changeColor);
console.log("paragraph: ", pageText);

changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getLargestImageSource,
  }, (source) => {
    let pageImage = document.getElementById("largeImage");
    let pageText = document.getElementById("sourceText");
    pageImage.src = source[0].result;
    pageText.innerText = source[0].result;
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

  if (!image) {
    return "";
  }
  return image.src;
}

// The body of this function will be executed as a content script inside the
// current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }
