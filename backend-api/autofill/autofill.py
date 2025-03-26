from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time
import re

service = Service(ChromeDriverManager().install())

# Launch Chrome
driver = webdriver.Chrome(service=service)

# Open the target webpage
driver.get("http://localhost:8000/test_form.html")
time.sleep(3)  # Wait for the page to fully load

# Define autofill data
autofill_data = {
    # Personal info
    "first name": "Elias",
    "last name": "Ghiz",
    "full name": "Elias Ghiz",
    "email": "eliasghiz@example.com",
    "date of birth": "1990-01-01",
    "phone number": "555-123-4567",
    # Locations
    "address": "1234 Street Name",
    "city": "Mothatown",
    "zip": "98101",
    "state": "Islandstate",
    "country": "United States",
    # Education
    "degree": "Bachelors of Science",
    "major": "Computer Science",
    "school": "Temple University",
    "graduation": "May 2025",
    # Past employment
    "employer": "Example Employer",
    "job title": "Programmer",
    "start date": "01/01/2020",
    "end date": "02/02/2020",
    "dates": "01/01/2020 - 02/02/2020",
    "responsibilities": "example responsibility",
    # Various job questions
    "skills": "example skills",
    "salary expectations": "$100,000",
    "certifications": "example certifications",
    "reference name": "Jack Raisch",
    "reference contact": "100-100-1000",
    "availability": "availability example",
    "why": "I like the location and salary",
    "relocate": "no",
    "authorized to work in US": "no",
    "about": "Test about section input",
    "additional": "I'm excited to get this working",
}

# Function to simplify labels for matching
def simplify_label(text):
    return re.sub(r'[\s:?*]', '', text.lower().strip())

# Find all input fields and textareas
fields = driver.find_elements(By.XPATH,
                              "//input[@type='text' or @type='email' or @type='tel' or @type='number' or @type='date'] | //textarea")

for field_element in fields:
    label_text = ""

    # Try to find an associated label directly
    field_id = field_element.get_attribute('id')
    if field_id:
        labels = driver.find_elements(By.XPATH, f"//label[@for='{field_id}']")
        if labels:
            label_text = labels[0].text.strip()

    # No label? Check parent or previous sibling
    if not label_text:
        try:
            parent = field_element.find_element(By.XPATH, "./parent::*")
            labels = parent.find_elements(By.TAG_NAME, "label")
            if labels:
                label_text = labels[0].text.strip()
            else:
                previous_label = field_element.find_element(By.XPATH, "./preceding::label[1]")
                if previous_label:
                    label_text = previous_label.text.strip()
        except:
            pass

    simplified_label_text = simplify_label(label_text)
    filled = False

    # Prioritize exact matches first
    if simplified_label_text in autofill_data:
        field_element.clear()
        field_element.send_keys(autofill_data[simplified_label_text])
        filled = True
        print(f"Filled '{label_text}' with '{autofill_data[simplified_label_text]}'")
    else:
        # Fallback to partial matches
        for key in autofill_data:
            if simplify_label(key) in simplified_label_text or simplified_label_text in simplify_label(key):
                field_element.clear()
                field_element.send_keys(autofill_data[key])
                filled = True
                print(f"Filled '{label_text}' with '{autofill_data[key]}'")
                break

    if not filled:
        print(f"No matching data found for label: '{label_text}'. Leaving blank.")

time.sleep(500)  # Shorter wait time
driver.quit()