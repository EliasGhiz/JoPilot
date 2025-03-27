// background.js – Handles API communication and other background tasks for the Chrome extension

import api from './api/api-service'; // Import the API instance

//Utility function to log messages
const log = (message, data = null) => {
  console.log(`[Background.js] ${message}`, data);
};

//Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  log('Received message', message);

  switch (message.type) 
  {
    case 'testApiConnection':
      handleTestApiConnection(sendResponse);
      return true; //Keep the message channel open for async response

    case 'getUserData':
      handleGetUserData(message.payload, sendResponse);
      return true;

    case 'saveToStorage':
      handleSaveToStorage(message.payload, sendResponse);
      return true;

    case 'fetchFromStorage':
      handleFetchFromStorage(message.payload, sendResponse);
      return true;

    default:
      log('Unknown message type', message.type);
      sendResponse({ success: false, error: 'Unknown message type' });
      return false;
  }
});

//Handle API connection test
const handleTestApiConnection = (sendResponse) => {
  log('Testing API connection...');
  api.get('/test')
    .then(response => {
      log('API Response', response.data);
      sendResponse({ success: true, data: response.data });
    })
    .catch(error => {
      log('API Error', error);
      sendResponse({ success: false, error: error.message });
    });
};

//Handle fetching user data from the API
const handleGetUserData = (payload, sendResponse) => {
  log('Fetching user data with payload', payload);
  api.get(`/user/${payload.userId}`)
    .then(response => {
      log('User data fetched successfully', response.data);
      sendResponse({ success: true, data: response.data });
    })
    .catch(error => {
      log('Error fetching user data', error);
      sendResponse({ success: false, error: error.message });
    });
};

//Handle saving data to Chrome storage
const handleSaveToStorage = (payload, sendResponse) => {
  log('Saving data to storage', payload);
  chrome.storage.local.set(payload, () => {
    if (chrome.runtime.lastError) {
      log('Error saving to storage', chrome.runtime.lastError);
      sendResponse({ success: false, error: chrome.runtime.lastError.message });
    } else {
      log('Data saved to storage successfully');
      sendResponse({ success: true });
    }
  });
};

//Handle fetching data from Chrome storage
const handleFetchFromStorage = (keys, sendResponse) => {
  log('Fetching data from storage', keys);
  chrome.storage.local.get(keys, (result) => {
    if (chrome.runtime.lastError) {
      log('Error fetching from storage', chrome.runtime.lastError);
      sendResponse({ success: false, error: chrome.runtime.lastError.message });
    } else {
      log('Data fetched from storage successfully', result);
      sendResponse({ success: true, data: result });
    }
  });
};