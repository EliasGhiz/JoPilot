const loadAutofillMemory = () => {
  fetch(chrome.runtime.getURL('autofill/autofill_memory.json')) // Ensure this path matches your directory structure
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      chrome.storage.local.set({ autofillMemory: data }, () => {
        console.log('Autofill memory loaded into Chrome storage:', data);
      });
    })
    .catch((error) => console.error('Error loading autofill memory:', error));
};

chrome.runtime.onInstalled.addListener(() => {
  loadAutofillMemory();
  console.log('Extension installed or updated. Autofill memory loaded.');
});

// Listen for storage updates
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.autofillMemory) {
    console.log('Autofill memory updated:', changes.autofillMemory.newValue);
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateAutofillMemory') {
    const updatedMemory = message.data;
    console.log('Received updated autofill memory:', updatedMemory);
    // Write the updated memory to autofill_memory.json
    saveAutofillMemoryToFile(updatedMemory);
  }

  if (message.action === 'checkLoginStatus') {
    // Replace this with your actual login status check logic
    chrome.storage.local.get('isLoggedIn', (result) => {
      sendResponse({ isLoggedIn: result.isLoggedIn || false });
    });
    return true; // Keep the message channel open for async response
  }
});

// Function to save autofill memory to JSON file
const saveAutofillMemoryToFile = (memory) => {
  const fileContent = JSON.stringify(memory, null, 2);
  const blob = new Blob([fileContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: url,
    filename: 'joPilot_extension/autofill/autofill_memory.json', // Ensure this matches your directory structure
    saveAs: false // Automatically save without prompting the user
  }, (downloadId) => {
    if (chrome.runtime.lastError) {
      console.error('Error saving autofill memory JSON file:', chrome.runtime.lastError.message);
    } else {
      console.log('Autofill memory successfully updated in JSON file. Download ID:', downloadId);
    }
    URL.revokeObjectURL(url); // Clean up the object URL
  });
};