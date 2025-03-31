// popup.js – Handles button interactions and communicates with background.js
//primarily used for scripts for popup.html which is the body of the extension

// Utility function to display output in the popup
const displayOutput = (message) => {
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = message;
};
  
// Add event listener for sync button
document.getElementById('syncButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'syncData' }, (response) => {
    if (response.success) {
      displayOutput(`Data synced: ${JSON.stringify(response.data)}`);
    } else {
      displayOutput(`Error: ${response.error}`);
    }
  });
});

// Add event listener for autofill data
document.getElementById('autofillButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'autofilledData' }, (response) => {
    if (response.success) {
      displayOutput('Information filled successfully!');
    } else {
      displayOutput(`Error: ${response.error}`);
    }
  });
});


