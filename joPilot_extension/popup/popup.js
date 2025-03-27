// popup.js – Handles button interactions and communicates with background.js

// Utility function to display output in the popup
const displayOutput = (message) => {
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = message;
  };
  
  // Add event listener for "Test API Connection" button
  document.getElementById('testApiButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'testApiConnection' }, (response) => {
      if (response.success) {
        displayOutput(`API Response: ${JSON.stringify(response.data)}`);
      } else {
        displayOutput(`Error: ${response.error}`);
      }
    });
  });
  
  // Add event listener for "Save Data to Storage" button
  document.getElementById('saveDataButton').addEventListener('click', () => {
    const dataToSave = { key: 'value' }; // Example data to save
    chrome.runtime.sendMessage({ type: 'saveToStorage', payload: dataToSave }, (response) => {
      if (response.success) {
        displayOutput('Data saved successfully!');
      } else {
        displayOutput(`Error: ${response.error}`);
      }
    });
  });
  
  // Add event listener for "Fetch Data from Storage" button
  document.getElementById('fetchDataButton').addEventListener('click', () => {
    const keysToFetch = ['key']; // Example keys to fetch
    chrome.runtime.sendMessage({ type: 'fetchFromStorage', payload: keysToFetch }, (response) => {
      if (response.success) {
        displayOutput(`Fetched Data: ${JSON.stringify(response.data)}`);
      } else {
        displayOutput(`Error: ${response.error}`);
      }
    });
  });