from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time

# Auto-manage ChromeDriver
service = Service(ChromeDriverManager().install())

# Launch Chrome
driver = webdriver.Chrome(service=service)

# Open the target webpage
driver.get("https://demoqa.com/text-box")  # Open the target webpage
time.sleep(3)  # Wait for the page to load

# Define the known text
known_text = "Auto-filled text"

# Find all empty text boxes and fill them
text_boxes = driver.find_elements(By.XPATH, "//input[@type='text']")
for box in text_boxes:
    if box.get_attribute("value") == "":  # Only fill if empty
        box.send_keys(known_text)


time.sleep(5)
driver.quit()
