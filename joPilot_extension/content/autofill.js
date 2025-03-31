// Simplify label text for matching
const simplifyLabel = (text) => {
    return text.toLowerCase().replace(/[\s:?*]/g, '').trim();
  };
  
  // Define a list of generalized mappings for fuzzy matching
  const generalizedMappings = {
    email: ["email", "emailaddress", "e-mail", "e-mailaddress", "contactemail"],
    "phone number": ["phone", "phonenumber", "contactnumber", "mobile", "mobilephone", "cellphone"],
    address: ["address", "streetaddress", "homeaddress", "mailingaddress"],
    city: ["city", "town", "locality"],
    state: ["state", "province", "region", "territory"],
    zipcode: ["zipcode", "postalcode", "zip", "postcode"],
    country: ["country", "nation", "residencecountry"],
    "first name": ["firstname", "givenname", "forename"],
    "last name": ["lastname", "surname", "familyname"],
    "full name": ["fullname", "name", "applicantname"],
    school: ["school", "schoolname", "university", "college", "institution"],
    major: ["major", "fieldofstudy", "specialization", "concentration"],
    employer: ["employer", "company", "organization", "workplace"],
    jobtitle: ["jobtitle", "position", "role", "designation"],
    employmentdates: ["employmentdates", "workdates", "jobdates", "datesofemployment"],
    "highest degree obtained": ["highestdegreeobtained", "degree", "educationlevel", "qualification"],
    graduationyear: ["graduationyear", "gradyear", "yearofgraduation"],
    skills: ["skills", "relevantskills", "abilities", "competencies"],
    certifications: ["certifications", "licenses", "credentials", "accreditations"],
    references: ["references", "referencename", "referencecontact", "recommendations"],
    "salary expectations": ["salaryexpectations", "desiredsalary", "expectedpay", "compensation"],
    "availability to start": ["availabilitytostart", "startdate", "earlieststartdate"],
    "why do you want to work here": ["whydoyouwanttoworkhere", "reasonforapplying", "motivation"],
    "relevant experience": ["relevantexperience", "workexperience", "jobhistory", "careerhistory"],
    "date of birth": ["dateofbirth", "dob", "birthdate"],
    "linkedin profile": ["linkedinprofile", "linkedin", "professionalprofile", "linkedinurl"],
    "github profile": ["githubprofile", "github", "portfolio", "githuburl"],
    "cover letter": ["coverletter", "applicationletter", "motivationletter"],
    "additional comments": ["additionalcomments", "extracomments", "notes", "remarks"],
    "authorized to work": ["areyouauthorizedtoworkintheus", "workauthorization", "authorizedtowork"],
    "willing to relocate": ["areyouwillingtorelocate", "relocation", "willingtorelocate"]
  };
  
  // Clear all form fields
  const clearFormFields = () => {
    const fields = document.querySelectorAll('input, textarea, select');
    fields.forEach((field) => {
      field.value = ''; // Clear the value of each field
      field.removeAttribute('value'); // Remove any persistent value attribute
      field.setAttribute('autocomplete', 'off'); // Disable browser autofill
    });
    console.log('Form fields cleared.');
  };
  
  // Match a simplified label to a key in the JSON using generalized mappings
  const matchKey = (simplifiedLabel) => {
    for (const [key, synonyms] of Object.entries(generalizedMappings)) {
      if (synonyms.includes(simplifiedLabel)) {
        return key; // Return the matched key
      }
    }
    return null; // No match found
  };
  
  // Autofill form fields
  const autofillForm = (autofillMemory) => {
    const fields = document.querySelectorAll('input, textarea, select');
  
    fields.forEach((field) => {
      let labelText = '';
  
      // Find associated label
      const fieldId = field.id;
      if (fieldId) {
        const label = document.querySelector(`label[for="${fieldId}"]`);
        if (label) labelText = label.textContent.trim();
      }
  
      // Try alternative methods if no explicit label is found
      if (!labelText) {
        const parent = field.closest('div');
        if (parent) {
          const label = parent.querySelector('label');
          if (label) labelText = label.textContent.trim();
        }
      }
  
      // Handle unconventional structures (e.g., labels inside <span> or <p>)
      if (!labelText) {
        const parent = field.closest('div');
        if (parent) {
          const span = parent.querySelector('span');
          if (span) labelText = span.textContent.trim();
        }
      }
  
      const simplifiedLabel = simplifyLabel(labelText);
  
      // Debugging: Log the label and simplified label
      console.log('Field ID:', field.id, 'Label:', labelText, 'Simplified Label:', simplifiedLabel);
  
      // Match the simplified label to a key in the JSON
      const matchedKey = matchKey(simplifiedLabel) || simplifiedLabel;
  
      // Autofill the field if a match is found in the JSON
      if (autofillMemory[matchedKey]) {
        field.value = autofillMemory[matchedKey];
        console.log(`Autofilled "${labelText}" with "${autofillMemory[matchedKey]}"`);
      } else {
        console.warn(`No match found for field with label: "${labelText}" or ID: "${field.id}"`);
      }
    });
  };
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'autofill') {
      console.log('Autofill button clicked. Starting autofill...');
      chrome.storage.local.get('autofillMemory', (result) => {
        if (result.autofillMemory) {
          autofillForm(result.autofillMemory);
        } else {
          console.error('No autofill memory found in Chrome storage.');
        }
      });
    } else if (request.action === 'clear') {
      console.log('Clear button clicked. Clearing form fields...');
      clearFormFields();
    }
  });