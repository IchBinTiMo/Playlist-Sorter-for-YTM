import { toggle } from "../script.js";

chrome.storage.sync.get(["toggled"], function(result) {
  document.getElementById("switch").checked = result.toggled;  
    console.log("user's setting applied from popup.js");
});

document.getElementById("switch").addEventListener("change", function(event) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      let currentTab = tabs[0]; // Get the first tab object in the array

      chrome.storage.sync.set({toggled: event.target.checked});

      if(currentTab.url.includes("https://music.youtube.com/playlist?")) {
          let toggled = event.target.checked;

          console.log("toggled");
          let contents = tabs;
          console.log(contents);
          chrome.scripting.executeScript({
              target: { tabId: currentTab.id },
              func: toggle,
              args: [toggled],
          })
      }
    });
});