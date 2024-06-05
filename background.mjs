import { toggle } from "./script.js";

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    chrome.storage.sync.get(["toggled"], function(result) {
        if(details.url.includes("https://music.youtube.com/playlist?")) {
            if(result.toggled) {
                chrome.scripting.executeScript({
                    target: { tabId: details.tabId },
                    func: toggle,
                    args: [result.toggled],
                })
            }
        }
    });
    console.log(`user's setting applied from onHistoryStateUpdated in background.js at ${details.url}`);
});

