

// Utility function to display output in the popup
const displayOutput = (message) => {
    const outputDiv = document.getElementById('output');

    if (outputDiv) {
      outputDiv.textContent = message;
    } else {
      console.error("Output div not found in popup.html");
    }
};
  
// Add event listener for sync button
const syncButton = document.getElementById('syncButton');
if (syncButton) {
  syncButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'syncData' }, (response) => {
      if (chrome.runtime.lastError) {
        displayOutput(`Error: ${chrome.runtime.lastError.message}`);
        return;
      }
      if (response) {
         if (response.success) {
           displayOutput(`Data synced: ${JSON.stringify(response.data || {})}`);
         } else {
           displayOutput(`Error: ${response.error || 'Unknown error during sync'}`);
         }
      } else {
         displayOutput('No response received from background script during sync.');
      }
    });
  });
} else {
  console.error("Sync button not found in popup.html");
}

// Add event listener for autofill data
const autofillButton = document.getElementById('autofillButton');
if (autofillButton) {
  autofillButton.addEventListener('click', () => {

    console.log("<<< POPUP: Autofill button clicked! Attempting to send 'triggerAutofill' message... >>>");

    chrome.runtime.sendMessage({ type: 'triggerAutofill' }, (response) => {

      if (chrome.runtime.lastError) {
        console.error("<<< POPUP: Error received after sending message: >>>", chrome.runtime.lastError.message);
        displayOutput(`Error: ${chrome.runtime.lastError.message}`);
        return;
      }
      if (response) {
          console.log("<<< POPUP: Response received from background: >>>", response);
          if (response.success) {
            displayOutput('Autofill requested successfully!');
          } else {
            displayOutput(`Error: ${response.error || 'Unknown error during autofill trigger'}`);
          }
      } else {
         console.log("<<< POPUP: No response received from background script. >>>");
         displayOutput('No response received from background script for autofill trigger.');
      }
    });


  });
} else {
  console.error("Autofill button not found in popup.html");
}

// Create an output div if it doesn't exist, for debugging purposes
if (!document.getElementById('output')) {
  const outputDiv = document.createElement('div');
  outputDiv.id = 'output';
  outputDiv.style.marginTop = '10px';
  outputDiv.style.padding = '5px';
  outputDiv.style.border = '1px solid #ccc';
  outputDiv.style.minHeight = '20px';
  outputDiv.style.wordWrap = 'break-word';

  const buttonContainer = document.getElementById('buttonContainer');
   if (buttonContainer) {
      buttonContainer.parentNode.insertBefore(outputDiv, buttonContainer.nextSibling);
   } else {
      document.body.appendChild(outputDiv); // Fallback append
   }
}
