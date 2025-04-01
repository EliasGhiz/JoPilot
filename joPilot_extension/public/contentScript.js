console.log("JoPilot Content Script Loaded!");


function highlightInputFields() {
  const fields = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="tel"], input[type="date"], textarea'
  );
  console.log(`Found ${fields.length} input fields/textareas to highlight.`);
  fields.forEach(field => {
    field.style.border = '2px solid yellow'; 
    field.style.backgroundColor = '#FFFFE0';
  });
}
highlightInputFields(); // Run highlighting on load


// Helper function to standardize labels
function simplifyLabel(text) {
  if (!text) return '';
  // Keep only alphanumeric, remove whitespace and symbols, lowercase
  return text.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

// Function to find the label associated with a field element
function findLabelForField(fieldElement) {
   let labelText = "";
   const fieldId = fieldElement.getAttribute('id');

   // 1. Try explicit label with "for" attribute
   if (fieldId) {
       const labels = document.querySelectorAll(`label[for="${fieldId}"]`);
       if (labels.length > 0) {
           labelText = labels[0].textContent.trim();
           if (labelText) return labelText;
       }
   }

   // 2. Try finding a label within the parent element
   let parent = fieldElement.parentElement;
   if (parent) {
       const labelsInParent = parent.querySelectorAll('label');
       if (labelsInParent.length === 1) { // Only if there's a single unambiguous label
           labelText = labelsInParent[0].textContent.trim();
            if (labelText) return labelText;
       }
   }
   
   // 3. Try finding the closest preceding label (less reliable)
    let sibling = fieldElement.previousElementSibling;
    while(sibling) {
        if (sibling.tagName === 'LABEL') {
            labelText = sibling.textContent.trim();
            if (labelText) return labelText;
            break; // Stop searching once a label is found, even if empty
        }
         sibling = sibling.previousElementSibling;
    }

   // 4. Placeholder attribute as a fallback
   const placeholder = fieldElement.getAttribute('placeholder');
   if (placeholder) {
        return placeholder.trim();
   }

   return ""; // Return empty if no label found
}


// Function to fill form fields
function fillFormFields(autofillData) {
  console.log("Attempting to fill form with data:", autofillData);
  let fieldsFilled = 0;

  const fields = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="tel"], input[type="date"], textarea'
  );

  fields.forEach(field => {
    const labelText = findLabelForField(field);
    if (!labelText) {
      console.log("Skipping field with no identifiable label:", field);
      return; // Skip fields without a clear label
    }

    const simplifiedLabel = simplifyLabel(labelText);
    let filled = false;

    // Try to find a matching key in the autofill data
    for (const key in autofillData) {
      const simplifiedKey = simplifyLabel(key);
      
      // Basic matching: check if simplified keys contain each other
      if (simplifiedKey && simplifiedLabel && 
         (simplifiedKey.includes(simplifiedLabel) || simplifiedLabel.includes(simplifiedKey))) {
        
        console.log(`Match found: Label "${labelText}" (Simplified: ${simplifiedLabel}) matches Key "${key}" (Simplified: ${simplifiedKey}). Filling with "${autofillData[key]}"`);
        
        // Set the value
        field.value = autofillData[key]; 
        
        // Optional: Trigger input/change events if needed for the page's JS
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        
        fieldsFilled++;
        filled = true;
        break; // Stop checking keys once a match is found for this field
      }
    }
    if (!filled) {
        console.log(`No matching key found for label: "${labelText}" (Simplified: ${simplifiedLabel})`);
    }
  });

  console.log(`Autofill attempt complete. Filled ${fieldsFilled} fields.`);
  return fieldsFilled > 0; // Return true if at least one field was filled
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Content script received message:", message);
  
  if (message.type === 'fillForm') {
    if (!message.data || Object.keys(message.data).length === 0) {
      console.error("Received fillForm message but no data was provided.");
      sendResponse({ success: false, error: "No data provided for autofill." });
      return;
    }
    try {
      const success = fillFormFields(message.data);
      if (success) {
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false, error: "No matching fields found to fill." });
      }
    } catch (error) {
       console.error("Error during form filling:", error);
       sendResponse({ success: false, error: `Error during fill: ${error.message}` });
    }
  } 

});