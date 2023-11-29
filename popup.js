// content.js

function executeCommand(command) {
  switch (command.Command) {
    case "selectWindow":
      chrome.windows.getAll({ populate: true }, function (windows) {
        windows.forEach(function (window) {
          window.tabs.forEach(function (tab) {
            if (tab.title === command.Target.split("=")[1]) {
              chrome.tabs.update(tab.id, { active: true });
            }
          });
        });
      });
      break;
    case "comment":
      // You can add logic for comments if needed
      break;
    case "storeText":
      storeText(command.Target, command.Value);
      break;
    case "executeScript":
      executeScript(command.Target, command.Value);
      break;
    case "pause":
      pause(command.Value);
      break;
    case "echo":
      echo(command.Target);
      break;
    case "click":
      click(command.Target);
      break;
    case "type":
      type(command.Target, command.Value);
      break;
    // Add more cases for other commands
  }
}

function storeText(target, variable) {
  // Implement logic to store text
  const element = document.querySelector(target);
  if (element) {
    const text = element.textContent.trim();
    window[variable] = text;
  }
}

function executeScript(target, variable) {
  // Implement logic to execute scripts
  const result = eval(target);
  window[variable] = result;
}

function pause(duration) {
  // Implement pause logic
  const milliseconds = parseInt(duration, 10);
  if (!isNaN(milliseconds)) {
    setTimeout(() => {}, milliseconds);
  }
}

function echo(text) {
  console.log(text);
}

function click(target) {
  // Implement logic to simulate a click
  const element = document.querySelector(target);
  if (element) {
    element.click();
  }
}

function type(target, value) {
  // Implement logic to simulate typing
  const element = document.querySelector(target);
  if (element) {
    element.value = value;
  }
}

// Assume that your UI Vision JSON code is stored in a variable named `uivisionCode`
const uivisionCode = {
  "Commands": [
    {
      "Command": "selectWindow",
      "Target": "title=Aledade / Worklists",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "Copy PatientFullName",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "storeText",
      "Target": "xpath=//*[@id=\"patient-call\"]/div/div[3]/div/div/div/div/div/div/div[2]/h4/a/span",
      "Value": "PatientFullName",
      "Description": ""
    },
    {
      "Command": "executeScript",
      "Target": "return ${PatientFullName}.split(',')[0].trim();",
      "Value": "LastName",
      "Description": "Extract and store the last name"
    },
    {
      "Command": "executeScript",
      "Target": "return ${PatientFullName}.split(',')[1].trim();",
      "Value": "FirstName",
      "Description": "Extract and store the first name"
    },
    {
      "Command": "pause",
      "Target": "500",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "copy PatientNumber",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "storeText",
      "Target": "xpath=//*[@id=\"patient-call\"]/div/div[3]/div/div/div/div/div/div[2]/div/div/div[2]/span",
      "Value": "PatientNumber",
      "Description": ""
    },
    {
      "Command": "pause",
      "Target": "300",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "copy PatientID",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "storeText",
      "Target": "/html/body/div[2]/div[26]/div/div[1]/div/ul/li[2]",
      "Value": "PatientID",
      "Description": ""
    },
    {
      "Command": "pause",
      "Target": "300",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "copy PatientDOB",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "storeText",
      "Target": "/html/body/div[1]/div/div[1]/div/div/div/div[3]/div/div[3]/div[1]/div[1]/div/div[1]/div/div[1]/div[2]/div",
      "Value": "PatientDOB",
      "Description": ""
    },
    {
      "Command": "echo",
      "Target": "${PatientDOB}",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "executeScript",
      "Target": "return ${PatientDOB}.split(' ')[3].trim().match(/[MF]/)[0];",
      "Value": "PatientGender",
      "Description": ""
    },
    {
      "Command": "pause",
      "Target": "300",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "confirm clipboard",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "echo",
      "Target": "${PatientFullName}",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "echo",
      "Target": "${PatientNumber}",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "echo",
      "Target": "${PatientID}",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "echo",
      "Target": "${PatientDOB}",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "Switch to Edify Tab",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "selectWindow",
      "Target": "title=Edify App",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "click",
      "Target": "/html/body/div[6]/div[9]/div[3]/div[1]/div/div[1]/div[1]/div[6]/div[8]/form/div[3]/input",
      "Value": "",
      "Targets": [
        "id=0040011116c40a7d2e10adbfb2_qfd00105253ba93517bc9d4d8b",
        "name=0040011116c40a7d2e10adbfb2_custom.PATIENTFIRSTNAME__c",
        "xpath=//*[@id=\"0040011116c40a7d2e10adbfb2_qfd00105253ba93517bc9d4d8b\"]",
        "xpath=//input[@id='0040011116c40a7d2e10adbfb2_qfd00105253ba93517bc9d4d8b']",
        "xpath=//form/div[3]/input",
        "css=#0040011116c40a7d2e10adbfb2_qfd00105253ba93517bc9d4d8b"
      ],
      "Description": ""
    },
    {
      "Command": "type",
      "Target": "/html/body/div[6]/div[9]/div[3]/div[1]/div/div[1]/div[1]/div[6]/div[8]/form/div[3]/input",
      "Value": "${PatientFullName}",
      "Description": ""
    },
    {
      "Command": "pause",
      "Target": "300",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "click",
      "Target": "/html/body/div[6]/div[9]/div[3]/div[1]/div/div[1]/div[1]/div[6]/div[8]/form/div[4]/input",
      "Value": "",
      "Targets": [
        "id=00400311166653885d9805ac1f_qfd0010525bae0a8eb51589c4a",
        "name=00400311166653885d9805ac1f_custom.PATIENTLASTNAME__c",
        "xpath=//*[@id=\"00400311166653885d9805ac1f_qfd0010525bae0a8eb51589c4a\"]",
        "xpath=//input[@id='00400311166653885d9805ac1f_qfd0010525bae0a8eb51589c4a']",
        "xpath=//form/div[4]/input",
        "css=#00400311166653885d9805ac1f_qfd0010525bae0a8eb51589c4a"
      ],
      "Description": ""
    },
    {
      "Command": "type",
      "Target": "/html/body/div[6]/div[9]/div[3]/div[1]/div/div[1]/div[1]/div[6]/div[8]/form/div[4]/input",
      "Value": "${LastName}",
      "Description": ""
    },
    {
      "Command": "type",
      "Target": "/html/body/div[6]/div[9]/div[3]/div[1]/div/div[1]/div[1]/div[6]/div[8]/form/div[3]/input",
      "Value": "${FirstName}",
      "Description": ""
    },
    {
      "Command": "pause",
      "Target": "300",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "click",
      "Target": "/html/body/div[6]/div[9]/div[3]/div[1]/div/div[1]/div[1]/div[6]/div[8]/form/div[2]/input",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "Delete all characters prior to the last 7 digits",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "executeScript",
      "Target": "return ${PatientID}.substring(${PatientID}.length - 7) ",
      "Value": "PatientID",
      "Description": ""
    },
    {
      "Command": "echo",
      "Target": "${PatientID}",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "type",
      "Target": "/html/body/div[6]/div[9]/div[3]/div[1]/div/div[1]/div[1]/div[6]/div[8]/form/div[2]/input",
      "Value": "${PatientID}",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "Delete all characters after the 10th character",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "executeScript",
      "Target": "return ${PatientDOB}.substring(0,10) ",
      "Value": "PatientDOB",
      "Description": ""
    },
    {
      "Command": "type",
      "Target": "/html/body/div[6]/div[9]/div[3]/div[1]/div/div[1]/div[1]/div[6]/div[8]/form/div[6]/input",
      "Value": "${PatientDOB}",
      "Description": ""
    },
    {
      "Command": "type",
      "Target": "/html/body/div[6]/div[9]/div[3]/div[1]/div/div[1]/div[1]/div[6]/div[8]/form/div[7]/textarea",
      "Value": "${PatientGender}",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "break",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "break",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "break",
      "Value": "",
      "Description": ""
    },
    {
      "Command": "comment",
      "Target": "go to Edify",
      "Value": "",
      "Description": ""
    }
  ]
};

// Execute each command in the JSON code
uivisionCode.Commands.forEach(executeCommand);
