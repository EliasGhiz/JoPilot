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
driver.get("https://demoqa.com/text-box")
time.sleep(3)  # Wait for the page to fully load

# Define autofill data clearly (extend as needed)
autofill_data = {
    "name": "Elias Ghiz",
    "full name": "Elias Ghiz",
    "first name": "Elias",
    "last name": "Ghiz",
    "email": "eliasghiz@example.com",
    "date of birth": "1990-01-01",
    "phone number": "555-123-4567",
    "address": "1234 Street Name",
    "city": "Mothatown",
    "zipcode": "98101",
    "state": "Islandstate",
    "country": "United States",
    "about": "Test about section input",
    "additional": "I'm excited to get this working ",
}


# Helper function to simplify label strings
def simplify_label(text):
    return re.sub(r'[\s:?*]', '', text.lower().strip())


# Find all input fields and text areas
fields = driver.find_elements(By.XPATH,
                              "//input[@type='text' or @type='email' or @type='tel' or @type='date'] | //textarea")

for field_element in fields:
    label_text = ""

    # Try to find an associated label directly
    field_id = field_element.get_attribute('id')
    if field_id:
        labels = driver.find_elements(By.XPATH, f"//label[@for='{field_id}']")
        if labels:
            label_text = labels[0].text.strip()

    # No label directly associated? Check parent label or previous sibling element
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
    for key in autofill_data:
        simplified_key = simplify_label(key)
        if simplified_key in simplified_label_text or simplified_label_text in simplified_key:
            field_element.send_keys(autofill_data[key])
            filled = True
            print(f"Filled '{label_text}' with '{autofill_data[key]}'")
            break

    if not filled:
        print(f"No matching data found for label: '{label_text}'. Leaving blank or adding default.")
        # Optionally include a default placeholder:
        # field_element.send_keys("Default Response")

time.sleep(5)  # Let user view filled values briefly
driver.quit()