console.log("JoPilot Content Script Loaded!");

// Function to find and highlight input fields
function highlightInputFields() {
  // Select input fields (text, email, tel, date) and text areas
  const fields = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="tel"], input[type="date"], textarea'
  );

  console.log(`Found ${fields.length} input fields/textareas to highlight.`);

  fields.forEach(field => {
    // Applies a simple highlight style
    field.style.border = '2px solid yellow';
    field.style.backgroundColor = '#FFFFE0'; // Light yellow background
  });
}

// Runs the highlighting function when the script loads
highlightInputFields();
