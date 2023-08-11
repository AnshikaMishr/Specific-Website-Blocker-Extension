document.addEventListener('DOMContentLoaded', function () {
    const blockButton = document.getElementById('blockButton');
    const websiteInput = document.getElementById('websiteInput');
    const status = document.getElementById('status');
  
    blockButton.addEventListener('click', function () {
      const website = websiteInput.value.trim();
      if (website) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const tab = tabs[0];
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: blockWebsite,
            args: [website],
          });
        });
      } else {
        status.textContent = 'Please enter a valid website';
      }
    });
  
    function blockWebsite(website) {
      const blockedSites = JSON.parse(localStorage.getItem('blockedSites')) || [];
      if (!blockedSites.includes(website)) {
        blockedSites.push(website);
        localStorage.setItem('blockedSites', JSON.stringify(blockedSites));
        status.textContent = `${website} is blocked`;
      } else {
        status.textContent = `${website} is already blocked`;
      }
    }
  });
  