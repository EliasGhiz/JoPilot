import json
import os
import re
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

# Load the test form webpage
driver.get("http://localhost:8000/test_form.html")
time.sleep(3)  # Allow page to load

# JSON file for storing autofill memory
memory_file = 'autofill_memory.json'

# Load or initialize autofill data
if os.path.exists(memory_file):
    with open(memory_file, 'r', encoding='utf-8') as file:
        autofill_data = json.load(file)
else:
    autofill_data = {}

# Helper function to standardize labels
def simplify_label(text):
    return re.sub(r'[\s:?*]', '', text.lower().strip())

# Locate all input fields and text areas
fields = driver.find_elements(By.XPATH,
                              "//input[@type='text' or @type='email' or @type='tel' or @type='date'] | //textarea")

# Autofill fields if data exists and attach listeners for real-time updates
for field_element in fields:
    label_text = ""
    field_id = field_element.get_attribute('id')
    if field_id:
        labels = driver.find_elements(By.XPATH, f"//label[@for='{field_id}']")
        if labels:
            label_text = labels[0].text.strip()

    # Try alternative methods if no explicit label is found
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

    simplified_label_text = simplify_label(label_text)

    # Autofill known fields
    filled = False
    for key in autofill_data:
        simplified_key = simplify_label(key)
        if simplified_key in simplified_label_text or simplified_label_text in simplified_key:
            field_element.clear()
            field_element.send_keys(autofill_data[key])
            filled = True
            print(f"Autofilled '{label_text}' with '{autofill_data[key]}'")

            # Attach JavaScript listener for real-time updates
            js_code = """
            arguments[0].addEventListener('input', function() {
                this.setAttribute('data-changed', 'true');
            });
            """
            driver.execute_script(js_code, field_element)
            break

    # If the field is unknown, attach JavaScript listener for Enter key detection
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

# Function to save updates to JSON
def save_updates():
    with open(memory_file, "w", encoding="utf-8") as file:
        json.dump(autofill_data, file, indent=4, ensure_ascii=False)
    print("Changes saved in real time!")

# Track new user inputs and modifications
recorded_labels = set()
timeout = 300  # Maximum wait time in seconds
elapsed_time = 0
check_interval = 1  # Interval to check fields (seconds)

try:
    while elapsed_time < timeout:
        # Detect fields with new input (user pressed Enter)
        pending_fields = driver.find_elements(By.XPATH,
                                              "//input[@data-enter-pressed='true'] | //textarea[@data-enter-pressed='true']")

        for field_element in pending_fields:
            label_text = ""
            field_id = field_element.get_attribute('id')

            # Find the associated label again
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
                        if (previous_label):
                            label_text = previous_label.text.strip()
                except:
                    continue

            simplified_label = simplify_label(label_text)

            # Skip processing if already recorded
            if simplified_label in recorded_labels or simplified_label in autofill_data:
                continue

            # Retrieve user input from field
            user_answer = field_element.get_attribute('value').strip()

            if user_answer:
                # Save the new response to JSON
                autofill_data[simplified_label] = user_answer
                save_updates()

                recorded_labels.add(simplified_label)
                print(f"'{label_text}' saved with '{user_answer}'.")

                # Remove attribute to prevent duplicate processing
                driver.execute_script("arguments[0].removeAttribute('data-enter-pressed');", field_element)

        # Detect fields that were modified after being autofilled
        modified_fields = driver.find_elements(By.XPATH, "//input[@data-changed='true'] | //textarea[@data-changed='true']")

        for field_element in modified_fields:
            label_text = ""
            field_id = field_element.get_attribute('id')

            # Find the associated label again
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

            # Retrieve updated user input
            new_answer = field_element.get_attribute('value').strip()

            # Update JSON if input has changed
            if simplified_label in autofill_data and autofill_data[simplified_label] != new_answer:
                autofill_data[simplified_label] = new_answer
                save_updates()
                print(f"Updated '{label_text}' to '{new_answer}' in JSON.")

            # Remove the attribute to prevent duplicate processing
            driver.execute_script("arguments[0].removeAttribute('data-changed');", field_element)

        time.sleep(check_interval)
        elapsed_time += check_interval

except KeyboardInterrupt:
    print("\nStopped manually by user.")

print(f"\nAll finished! {len(recorded_labels)} new/updated prompts saved into {memory_file}. Closing browser shortly.")
time.sleep(5)
driver.quit()