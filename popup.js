document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('copyButton').addEventListener('click', copyBioData);
  document.getElementById('pasteButton').addEventListener('click', pasteBioData);
});

function copyBioData() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'copyBioData'});
  });
}

function pasteBioData() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'pasteBioData'});
  });
}
