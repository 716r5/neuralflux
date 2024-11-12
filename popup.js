//The popup will allow users to select preferences and initiate question generation.
document.getElementById("generateQuestions").addEventListener("click", () => {
    const questionType = document.getElementById("questionType").value;
    const difficulty = document.getElementById("difficulty").value;
  
    // Retrieve content from the current page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "extractContent" },
        (response) => {
          if (response.error) {
            document.getElementById("questionsContainer").innerText = "Error: " + response.error;
          } else {
            // Send extracted content to background for AI question generation
            chrome.runtime.sendMessage(
              {
                action: "generateQuestions",
                content: response.content,
                questionType,
                difficulty
              },
              (response) => {
                if (response.error) {
                  document.getElementById("questionsContainer").innerText = "Error: " + response.error;
                } else {
                  document.getElementById("questionsContainer").innerHTML = response.questions.join("<br>");
                }
              }
            );
          }
        }
      );
    });
  });  