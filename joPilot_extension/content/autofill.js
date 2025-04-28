// Simplify label text for matching
const simplifyLabel = (text) => {
    return text.toLowerCase().replace(/[\s:?*]/g, '').trim();
  };
  
  // Expanded generalizedMappings with additional synonyms
  const generalizedMappings = {
    "first name": ["firstname", "givenname", "forename", "first_name"],
    "middle name": ["middlename", "middle_name", "midname"],
    "last name": ["lastname", "surname", "familyname", "last_name"],
    "suffix": ["suffix", "namesuffix", "name_suffix"],
    "full name": ["fullname", "name", "applicantname", "complete name"],
    "email": ["email", "emailaddress", "e-mail", "e-mailaddress", "contactemail", "primaryemail"],
    "phone number": ["phone", "phonenumber", "contactnumber", "mobile", "mobilephone", "cellphone", "telephone"],
    "address": ["address", "streetaddress", "homeaddress", "mailingaddress", "residentialaddress"],
    "city": ["city", "town", "locality", "municipality"],
    "state": ["state", "province", "region", "territory", "state/province"],
    "zipcode": ["zipcode", "postalcode", "zip", "postcode", "zip/postalcode"],
    "country": ["country", "nation", "residencecountry", "countryofresidence"],
    "linkedin profile": ["linkedinprofile", "linkedin", "linkedin url", "linkedinlink"],
    "github profile": ["githubprofile", "github", "github url", "githublink", "githubrepository"],
    "portfolio url": ["portfolio", "portfoliourl", "portfolio_url", "portfolio link", "personal website", "website", "site"],
    "personal website": ["personalwebsite", "personal site", "website", "homepage"],
    "date of birth": ["dateofbirth", "dob", "birthdate", "birth_date"],
    "highest degree obtained": ["highestdegreeobtained", "degree", "educationlevel", "qualification", "degreeobtained"],
    "school": ["school", "schoolname", "university", "college", "institution", "educationalinstitution"],
    "major": ["major", "fieldofstudy", "specialization", "concentration", "areaofstudy"],
    "graduation year": ["graduationyear", "gradyear", "yearofgraduation", "graduation_year", "yeargraduated"],
    "availability to start": ["availabilitytostart", "startdate", "earlieststartdate", "availabledate", "availability"],
    "notice period": ["noticeperiod", "notice", "notice_period", "currentnoticeperiod"],
    "languages": ["languages", "spokenlanguages", "language proficiency"],
    "employer": ["employer", "company", "organization", "workplace", "companyname"],
    "previous employer name": ["previousemployername", "employername", "companyname", "lastemployer", "formeremployer"],
    "job title": ["jobtitle", "position", "role", "designation", "job_title", "title"],
    "employment dates": ["employmentdates", "workdates", "jobdates", "datesofemployment", "employment_period", "workhistorydates"],
    "salary expectations": ["salaryexpectations", "desiredsalary", "expectedpay", "compensation", "salaryrange"],
    "authorized to work": ["areyouauthorizedtoworkintheus", "workauthorization", "authorizedtowork", "work_auth", "workeligibility", "are you authorized to work in the u.s.", "areyouauthorizedtoworkintheu.s."],
    "willing to relocate": ["areyouwillingtorelocate", "relocation", "willingtorelocate", "relocate", "relocationwillingness", "are you willing to relocate"],
    "willing to travel": ["willingtotravel", "travel", "travelavailability", "travelwillingness"],
    "certifications": ["certifications", "licenses", "credentials", "accreditations", "certificates", "relevantcertifications", "list any relevant certifications", "listanyrelevantcertifications"],
    "veteran status": ["veteranstatus", "veteran", "militarystatus", "veteran_or_service_member"],
    "security clearance": ["securityclearance", "clearancelevel", "clearance"],
    "cover letter": ["coverletter", "applicationletter", "motivationletter", "coveringletter"],
    "referencename": ["referencename", "reference", "nameofreference", "reference_name", "referee"],
    "reference contact": ["referencecontact", "referencecontactinfo", "contactinfoofreference", "reference_contact"],
    "additional comments": ["additionalcomments", "extracomments", "notes", "remarks", "anythingelse", "additionalinfo", "is there anything else you’d like us to know", "is there anythign else youd like us to know", "isthereanythingelseyou’dlikeustoknow"],
    "why do you want to work here": ["why do you want to work here", "motivation", "reason for applying", "why join", "why do you want this job", "whydoyouwanttoworkhere","why are you interested in this position","what interests you about this role","why this company","why us"],
    "skills": ["skills", "relevant skills", "key skills", "technical skills", "soft skills", "list your skills", "relevantskills"],
    "key responsibilities": ["keyresponsibilities", "responsibilities", "jobresponsibilities", "workresponsibilities"],
    "reason for leaving": ["reasonforleaving", "leavingreason", "why you left", "reason for departure"],
    "when can you start": ["whencanyoustart", "availability", "startdate", "earlieststartdate"],
    "notice period": ["noticeperiod", "noticeperiod(ifapplicable)", "currentnoticeperiod", "notice"],
    "languages spoken": ["languagesspoken", "languages", "spokenlanguages", "language proficiency"],
    "are you a veteran": ["areyouaveteran", "veteranstatus", "militarystatus", "veteran"],
    "do you have a security clearance": ["doyouhaveasecurityclearance", "securityclearance", "clearancelevel", "clearance"],
    "describe any leadership roles you have held": ["describeanyleadershiprolesyouhaveheld", "leadershiproles", "leadership experience"],
    "what type of work environment do you thrive in": ["whattypeofworkenvironmentdoyouthrivein", "workenvironment", "preferredworkenvironment"],
    "list your hobbies and interests": ["listyourhobbiesandinterests", "hobbies", "interests", "hobbiesandinterests"],
    "emergency contact name": ["emergencycontactname", "emergencycontact", "contactname"],
    "relationship to emergency contact": ["relationshiptoemergencycontact", "emergencycontactrelationship", "relationship"],
    "emergency contact phone number": ["emergencycontactphonenumber", "emergencycontactphone", "contactphonenumber"],
    "do you have any comments on diversity and inclusion in the workplace": [
      "doyouhaveanycommentsondiversityandinclusionintheworkplace",
      "diversityandinclusioncomments",
      "diversitycomments",
      "inclusioncomments"
    ]
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
  
  // Save updates to Chrome storage and notify background script to update JSON
  const saveToAutofillMemory = (key, value) => {
    chrome.storage.local.get('autofillMemory', (result) => {
      const autofillMemory = result.autofillMemory || {};
      autofillMemory[key] = value;

      // Dynamically update generalizedMappings for future references
      if (!generalizedMappings[key]) {
        generalizedMappings[key] = [key];
        console.log(`Added new key to generalizedMappings: ${key}`);
      }

      chrome.storage.local.set({ autofillMemory }, () => {
        console.log(`Updated autofill memory: ${key} = ${value}`);
        // Notify background script to update the JSON file
        chrome.runtime.sendMessage({ action: 'updateAutofillMemory', data: autofillMemory });
      });
    });
  };
  
  // Listen for user input and update JSON
  const attachInputListeners = (field, labelText) => {
    field.addEventListener('change', () => {
      const userInput = field.value.trim();
      if (userInput) {
        console.log(`Change detected for "${labelText}": ${userInput}`);
        saveToAutofillMemory(labelText, userInput);
      }
    });
  
    // Handle "Enter" key press
    field.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const userInput = field.value.trim();
        if (userInput) {
          console.log(`Enter key pressed for "${labelText}": ${userInput}`);
          saveToAutofillMemory(labelText, userInput);
          field.setAttribute('data-enter-pressed', 'true');
        }
      }
    });
  };
  
  // Improved label extraction logic
  const extractLabelText = (field) => {
    let labelText = '';
  
    // Check for explicit label using 'for' attribute
    const fieldId = field.id;
    if (fieldId) {
      const label = document.querySelector(`label[for="${fieldId}"]`);
      if (label) labelText = label.textContent.trim();
    }
  
    // Check for parent label
    if (!labelText) {
      const parent = field.closest('label');
      if (parent) labelText = parent.textContent.trim();
    }
  
    // Check for sibling or ancestor labels
    if (!labelText) {
      const parent = field.closest('div');
      if (parent) {
        const label = parent.querySelector('label, span, p');
        if (label) labelText = label.textContent.trim();
      }
    }
  
    return labelText;
  };
  
  // Enhanced autofill logic
  const autofillForm = (autofillMemory) => {
    const fields = document.querySelectorAll('input, textarea, select');
    fields.forEach((field) => {
      const labelText = extractLabelText(field);
      const simplifiedLabel = simplifyLabel(labelText);
  
      const matchedKey = matchKey(simplifiedLabel) || simplifiedLabel;
  
      if (autofillMemory[matchedKey]) {
        if (field.tagName === 'SELECT') {
          // Handle dropdowns by matching the option value or text
          const options = Array.from(field.options);
          const autofillValue = autofillMemory[matchedKey].toLowerCase();
          const matchingOption = options.find(option =>
            option.value.toLowerCase() === autofillValue || option.text.toLowerCase() === autofillValue
          );
          if (matchingOption) {
            field.value = matchingOption.value;
            console.log(`Autofilled dropdown "${labelText}" with "${matchingOption.text}"`);
          } else {
            console.warn(`No matching option found for dropdown "${labelText}" with value "${autofillValue}"`);
          }
        } else {
          // Handle input and textarea fields
          field.value = autofillMemory[matchedKey];
          console.log(`Autofilled "${labelText}" with "${autofillMemory[matchedKey]}"`);
        }
      } else {
        console.warn(`No match found for field with label: "${labelText}" (Simplified: "${simplifiedLabel}")`);
        attachInputListeners(field, simplifiedLabel); // Attach listener for new inputs
      }
    });
  };
  
  // Debugging: Log storage updates
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.autofillMemory) {
      console.log('Autofill memory updated:', changes.autofillMemory.newValue);
    }
  });
  
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