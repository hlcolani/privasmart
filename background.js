chrome.tabs.onUpdated.addListener(function() {
  if chrome.declarativeContent.PageStateMatcher({css: ["input[type='password']"]
        }) {
    alert("Hello! I am an alert box!!")
  }});

 /* chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // When a page contains a password...
        new chrome.declarativeContent.PageStateMatcher({
          css: ["input[type='password']"]
        })
      ],
      // ... show the page action.
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});*/