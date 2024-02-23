document.addEventListener('DOMContentLoaded', function() {
  var extractTextButton = document.getElementById('extractTextButton');

  extractTextButton.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { "action": 'extractText' }, function (response){
        console.log(response);
        alert(response);
			});
    });
  });
});