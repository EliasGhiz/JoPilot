import json
import os
import re
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

# Set up Selenium Chrome driver using WebDriverManager
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

# Load the specific webpage for autofill actions
driver.get("https://demoqa.com/text-box")
time.sleep(3)  # Wait briefly for webpage to load fully

# Define the file name for permanent autofill memory (as a JSON file)
memory_file = 'autofill_memory.json'

# Load the existing autofill data from the JSON file if it already exists
if os.path.exists(memory_file):
    with open(memory_file, 'r', encoding='utf-8') as file:
        autofill_data = json.load(file)
else:
    autofill_data = {}

# Predefined answers for some common form fields (initial defaults)
#default_answers = { }

# Merge any loaded data with default answers (defaults are overwritten by loaded data if conflicts exist)
#autofill_data = {**default_answers, **autofill_data}


# Helper function: simplifies labels by removing spaces and special characters, converting to lowercase
def simplify_label(text):
    return re.sub(r'[\s:?*]', '', text.lower().strip())


# Identify all text input fields and text areas on the webpage
fields = driver.find_elements(By.XPATH,
                              "//input[@type='text' or @type='email' or @type='tel' or @type='date'] | //textarea")

# Attach JavaScript Enter-key detectors to new (unknown) input fields on the page
for field_element in fields:
    label_text = ""

    # Attempt to associate labels with fields using 'for' attribute
    field_id = field_element.get_attribute('id')
    if field_id:
        labels = driver.find_elements(By.XPATH, f"//label[@for='{field_id}']")
        if labels:
            label_text = labels[0].text.strip()

    # Try alternative methods to find label if needed
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
            continue  # Skip if all label methods fail

    simplified_label_text = simplify_label(label_text)

    # Automatically fill known fields with remembered answers
    filled = False
    for key in autofill_data:
        simplified_key = simplify_label(key)
        if simplified_key in simplified_label_text or simplified_label_text in simplified_key:
            field_element.send_keys(autofill_data[key])
            filled = True
            print(f"Filled '{label_text}' automatically with '{autofill_data[key]}'")
            break

    # If the field is unknown, add JavaScript listener for Enter-key detection
    if not filled:
        js_code = """
        arguments[0].addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                this.setAttribute('data-enter-pressed', 'true');
            }
        });
        """
        driver.execute_script(js_code, field_element)
        print(f"Waiting for user to input response for '{label_text}' and press Enter.")

print(
    "\nEnter your answers directly into the webpage. Each response you submit (by pressing Enter) is immediately stored.")

# Prepare set to track which new fields we've already saved
recorded_labels = set()

# Monitor continuously for Enter-key events on webpage form fields
timeout = 300  # Maximum wait time in seconds
check_interval = 1  # Interval to check fields (seconds)
elapsed_time = 0

try:
    while elapsed_time < timeout:
        pending_fields = driver.find_elements(By.XPATH,
                                              "//input[@data-enter-pressed='true'] | //textarea[@data-enter-pressed='true']")

        for field_element in pending_fields:
            label_text = ""
            field_id = field_element.get_attribute('id')

            # Find the associated field label
            if field_id:
                labels = driver.find_elements(By.XPATH, f"//label[@for='{field_id}']")
                if labels:
                    label_text = labels[0].text.strip()

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
                    continue

            simplified_label = simplify_label(label_text)

            # Skip processing if already recorded
            if simplified_label in recorded_labels or simplified_label in autofill_data:
                continue

            # Retrieve user's answer from webpage field
            user_answer = field_element.get_attribute('value').strip()

            if user_answer:
                # Immediately update the autofill memory JSON file permanently
                autofill_data[simplified_label] = user_answer
                with open(memory_file, 'w', encoding='utf-8') as file:
                    json.dump(autofill_data, file, indent=4, ensure_ascii=False)

                recorded_labels.add(simplified_label)
                print(f"'{label_text}' successfully saved with '{user_answer}'.")

                # Remove JavaScript-triggered attribute to avoid duplicate processing
                driver.execute_script("arguments[0].removeAttribute('data-enter-pressed');", field_element)

        time.sleep(check_interval)
        elapsed_time += check_interval

except KeyboardInterrupt:
    print("\nStopped manually by user.")

print(
    f"\nAll finished! {len(recorded_labels)} new prompts saved permanently into {memory_file}. Closing browser shortly.")
time.sleep(5)
driver.quit()