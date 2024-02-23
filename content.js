chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == 'extractText') {
    console.log('???');
    // let text = document.getElementById('guide-body').innerText;
    sendResponse({"text":"abc"});
  }
});