//import api from '../api/api-service'; // Import the API instance

//Utility function to log messages
const log = (message, data = null) => {
  console.log(`[Background.js] ${message}`, data !== null ? data : '');
};

//Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  log('Received message', message);

  switch (message.type) 
  {
    // case 'testApiConnection':
    //   handleTestApiConnection(sendResponse);
    //   return true; //Keep the message channel open for async response

    // case 'getUserData':
    //   handleGetUserData(message.payload, sendResponse);
    //   return true;

    case 'saveToStorage':
      handleSaveToStorage(message.payload, sendResponse);
      return true; // Keep channel open for async response

    case 'fetchFromStorage':
      handleFetchFromStorage(message.payload, sendResponse);
      return true; // Keep channel open for async response

    case 'triggerAutofill': // <<< ADD THIS CASE
      handleTriggerAutofill(sendResponse);
      return true; // Keep channel open for async response

    default:
      log('Unknown message type', message.type);
      sendResponse({ success: false, error: 'Unknown message type' });
      return false; // No async response needed
  }
});

//Handle API connection test
const handleFetchFromStorage = (keys, sendResponse) => {
  log('Fetching data from storage', keys);
  const validKeys = Array.isArray(keys) || typeof keys === 'object' || keys === null ? keys : null;
  chrome.storage.local.get(validKeys, (result) => {
    if (chrome.runtime.lastError) {
      log('Error fetching from storage', chrome.runtime.lastError);
      sendResponse({ success: false, error: chrome.runtime.lastError.message });
    } else {
      log('Data fetched from storage successfully', result);
      sendResponse({ success: true, data: result });
    }
  });
};

// Handle the autofill trigger from the popup
const handleTriggerAutofill = (sendResponse) => {
  log('Autofill triggered. Fetching data...');
  chrome.storage.local.get(null, (autofillData) => {
    if (chrome.runtime.lastError) {
      log('Error fetching autofill data from storage', chrome.runtime.lastError);
      sendResponse({ success: false, error: `Storage fetch error: ${chrome.runtime.lastError.message}` });
      return;
    }

    if (Object.keys(autofillData).length === 0) {
       log('No autofill data found in storage.');
       sendResponse({ success: false, error: 'No autofill data found.' });
       return;
    }

    log('Autofill data fetched', autofillData);

    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0 || !tabs[0].id) { // Check if tab exists and has an ID
        log("No active tab found or tab has no ID.");
        sendResponse({ success: false, error: "No active tab found." });
        return;
      }
      const activeTabId = tabs[0].id;
      const messageToSend = { type: 'fillForm', data: autofillData };

      // --- ADD THESE LOGS ---
      console.log(`<<< BACKGROUND: Attempting to send message to Tab ID: ${activeTabId} >>>`);
      console.log("<<< BACKGROUND: Message Content: >>>", messageToSend);
      // --- END OF ADDED LOGS ---

      chrome.tabs.sendMessage(
        activeTabId,
        messageToSend,
        (response) => {
          if (chrome.runtime.lastError) {
            console.error('<<< BACKGROUND: Error sending message to content script: >>>', chrome.runtime.lastError.message);
             sendResponse({ success: false, error: `Could not communicate with content script: ${chrome.runtime.lastError.message}. Is the content script active on this page?` });
          } else if (response && response.success) {
            log('<<< BACKGROUND: Content script responded with success. >>>', response);
            sendResponse({ success: true });
          } else {
             log('<<< BACKGROUND: Content script responded with failure or no response. >>>', response);
             sendResponse({ success: false, error: response?.error || 'Content script failed or did not respond.' });
          }
        }
      );
    });
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