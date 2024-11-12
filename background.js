// The background script manages the main functionalities, like handling the user’s preferences for question type and difficulty.
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ questionType: "logical", difficulty: "medium" });
    console.log("Defaults set: logical questions, medium difficulty.");
  });
  
  // Listen for messages from popup.js or content.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "generateQuestions") {
      generateQuestionsWithChromeAI(request.content, request.questionType, request.difficulty)
        .then((questions) => sendResponse({ questions }))
        .catch((error) => sendResponse({ error: error.message }));
      return true; // Keeps the message channel open for async response
    }
  });
  
  // New function to call Chrome's AI API
  async function generateQuestionsWithChromeAI(content, type, difficulty) {
    try {
      // Assuming the Chrome AI API provides a question-generation function
      const response = await chrome.ai.generateQuestions({
        content: content,
        type: type,
        difficulty: difficulty,
      });
      return response.questions; // Adjust based on actual API response structure
    } catch (error) {
      console.error("Error with Chrome AI API:", error);
      throw new Error("Failed to generate questions.");
    }
  }