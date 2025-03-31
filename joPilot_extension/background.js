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
});