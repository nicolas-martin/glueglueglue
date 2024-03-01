chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'copyBioData') {
        var xPathBioData = {
            name: document.evaluate("//p[@id='name']/span[@id='nameValue']", document, null, 0, null)
                    .iterateNext().textContent,
            username: document.evaluate("//p[@id='username']/span[@id='usernameValue']", document, null, 0, null)
                    .iterateNext().textContent,
            email: document.evaluate("//p[@id='email']/span[@id='emailValue']", document, null, 0, null)
                    .iterateNext().textContent,
            contact: document.evaluate("//p[@id='contact']/span[@id='contactValue']", document, null, 0, null)
                    .iterateNext().textContent,
            address: document.evaluate("//p[@id='address']/span[@id='addressValue']", document, null, 0, null)
                    .iterateNext().textContent
        };
        var cssSelectorBioData = {
            name: document.getElementById('nameValue').innerText,
            username: document.getElementById('usernameValue').innerText,
            email: document.getElementById('emailValue').innerText,
            contact: document.getElementById('contactValue').innerText,
            address: document.getElementById('addressValue').innerText
        };
          
        chrome.storage.sync.set({cssSelectorBioData:cssSelectorBioData, xPathBioData: xPathBioData})
    }
    else if (message.action === 'pasteBioData') {
        chrome.storage.sync.get(["cssSelectorBioData", "xPathBioData"], function(result) {
            if (result.xPathBioData) {
                document.evaluate("//div[@class='form-group']/input[@id='name']", document, null, 0, null).iterateNext().value = result.xPathBioData.name;
                document.evaluate("//div[@class='form-group']/input[@id='username']", document, null, 0, null).iterateNext().value = result.xPathBioData.username;
                document.evaluate("//div[@class='form-group']/input[@id='email']", document, null, 0, null).iterateNext().value = result.xPathBioData.email;
                document.evaluate("//div[@class='form-group']/input[@id='contact']", document, null, 0, null).iterateNext().value = result.xPathBioData.contact;
                document.evaluate("//div[@class='form-group']/input[@id='address']", document, null, 0, null).iterateNext().value = result.xPathBioData.address;
            }
            if (result.cssSelectorBioData) {
                document.getElementById('name').value = result.cssSelectorBioData.name;
                document.getElementById('username').value = result.cssSelectorBioData.username;
                document.getElementById('email').value = result.cssSelectorBioData.email;
                document.getElementById('contact').value = result.cssSelectorBioData.contact;
                document.getElementById('address').value = result.cssSelectorBioData.address;
            }
        })
    }
  });