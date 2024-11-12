function bookmarkQuestion(question, articleLink) {
    chrome.storage.sync.get("bookmarkedQuestions", (data) => {
      const bookmarks = data.bookmarkedQuestions || [];
      bookmarks.push({ question, articleLink });
      chrome.storage.sync.set({ bookmarkedQuestions: bookmarks });
    });
  }  