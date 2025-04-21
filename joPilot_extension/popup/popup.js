const autofillButton = document.getElementById('autofillButton');
const clearButton = document.getElementById('clearButton');

// Utility function to display output in the popup
const displayOutput = (message) => {
  const outputDiv = document.getElementById('output');
  if (outputDiv) {
    outputDiv.textContent = message;
  } else {
    console.log(message); // Fallback to console if outputDiv is not present
  }
};

// Check login status and hide login button if logged in
document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ action: 'checkLoginStatus' }, (response) => {
    if (response.isLoggedIn) {
      const loginButton = document.getElementById('loginButton');
      if (loginButton) {
        loginButton.style.display = 'none';
      }
    }
  });
});

// Add event listener for autofill button
autofillButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'autofilledData' }, (response) => {
    if (response.success) {
      displayOutput('Information filled successfully!');
    } else {
      displayOutput(`Error: ${response.error}`);
    }
  });
});

clearButton.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'clear' });
  });
});