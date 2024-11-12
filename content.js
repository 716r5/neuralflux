// to access web articles from chrome
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractContent") {
      const content = document.body.innerText || "";
      sendResponse({ content });
    }
  });  