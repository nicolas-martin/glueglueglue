function selectTabByTitle(title) {
  chrome.tabs.query({ title: title }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.tabs.update(tabId, { active: true });
      chrome.tabs.sendMessage(tabId, { action: 'extractText' });
    } else {
      console.error(`No tab found with title: ${title}`);
    }
  });
}

function storeCopiedText(variable) {
  navigator.clipboard.readText().then((copiedText) => {
    window[variable] = copiedText;
    console.log(`Stored copied text "${copiedText}" in variable ${variable}`);
  });
}

function selectAndCopyText(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.select();
    document.execCommand("copy");
    console.log(`Selected and copied text from element with selector ${selector}`);
  }
}
function selectText(selector) {
  // Get the currently active tab
  chrome.tabs.query({ title: title }, (tabs) => {
    // Get the tab's ID
    var tabId = tabs[0].id;

    // Execute a script in the tab to select text
    chrome.tabs.executeScript(tabId, {
      code: `var element = document.querySelector('${selector}'); 
             if (element) {
                const textContent = element.textContent.trim();
								window[command.Value] = textContent;
								console.log('Stored text "${textContent}" in variable ${command.Value}");
             }`,
    });
  });
}
function getTextContent(selector) {
  const element = document.querySelector(selector);
	if (element){
		console.log(element.textContent.trim());
		return element.textContent.trim();
	}
  return null;
}

function pause(duration) {
  const milliseconds = parseInt(duration, 10);
  if (!isNaN(milliseconds)) {
    setTimeout(() => {
      console.log(`Paused for ${milliseconds} milliseconds`);
    }, milliseconds);
  }
}

function echo(text) {
  console.log(`Echo: ${text}`);
}

function click(target) {
  const element = document.querySelector(target);
  if (element) {
    element.click();
    console.log(`Clicked on element with selector ${target}`);
  }
}

function type(target, value) {
  const element = document.querySelector(target);
  if (element) {
    element.value = value;
    console.log(`Typed "${value}" into element with selector ${target}`);
  }
}

function executeCommand(command) {
  switch (command.Command) {
    case "click":
      click(command.Target);
      break;
    case "type":
      type(command.Target, command.Value);
      break;
    case "getTextContent":
      const textContent = getTextContent(command.Target);
      window[command.Value] = textContent;
      console.log(`Stored text "${textContent}" in variable ${command.Value}`);
      break;
    case "pause":
      pause(command.Value);
      break;
    case "echo":
      echo(command.Target);
      break;
    case "selectWindow":
      const newTitle = command.Target.split("=")[1];
      console.log(newTitle);
      selectTabByTitle(newTitle);
      break;
  }
}

const uivisionCode = {
  "Commands": [
    { "Command": "selectWindow", "Target": "title=Warrior Tank Best in Slot Gear - Phase 1 Season of Discovery  - Wowhead", "Value": "" },   
    { "Command": "getTextContent", "Target": "body > h1", "Value": "" },
  ]
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'extractText') {
    var text = document.body.innerText;
    alert('Text extracted from the current tab:\n\n' + text);
  }
});
uivisionCode.Commands.forEach(executeCommand);
