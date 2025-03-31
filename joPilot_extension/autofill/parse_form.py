import requests
from bs4 import BeautifulSoup

url = 'http://localhost:8000/test_form.html'
response = requests.get(url)

if response.status_code ==200:
    html_content = response.text

    soup = BeautifulSoup(html_content, 'html.parser')

    #finds input, select, and text area fields
    form_fields = soup.find_all(['input', 'textarea', 'select'])
    print(f"Found {len(form_fields)} form fields.")

    #finds label that is associated with the input field
    question_list = {
        "name": ["What is your name?", "Name", "Name:", "First Name", "First Name: ", "First Name?", "Last Name", "Last Name:", "Last Name?"],
        "phone": ["Phone Number", "Phone", "Phone Number:", "Phone:", "What is your phone number?", "What is your phone number"],
        "email": ["Email", "Email Address", "Email:", "What is your email?", "What is your email address?"],
        "location": ["City", "Location", "City:", "Location:", "What city do you live in?", "Where do you live?", "Address", "What is your address?", "State:", "State","Zip Code", "Zip Code:","Country", "Country:",  ],
        "employment": ["Employment History", "Previous Employment", "Work Experience", "Work Experience:", "Employer Name", "Employer Name:","Job Title", "Job Title:", "Employment Dates", "Employment Dates:", "Responsibilities", "Responsibilities:","Key Responsibilities", "Key Responsibilities:"],
        "education": ["Education", "Educational Background", "Highest Degree", "Degree", "Degree:", "Major", "Major:", "Major/Field of Study", "Major/Field of Study?", "School Name", "School Name:", "Graduation Year", "Graduation Year:"],
        "linkedin": ["LinkedIn Profile", "LinkedIn", "LinkedIn:", "LinkedIn Profile:","LinkedIn URL:", "LinkedIn URL", "What is your LinkedIn profile?"],
        "website": ["Website", "Website:","Website URL", "Website URL", "What is your website?", "Personal Website", "Personal Website:"],
        "additional": ["Why do you want to work for this company?", "What skills do you have?", "What is your availability", "What is your availability to start?", "Salary Expectations", "What are your salary expectations?" ]
    }

    def simplify_question(question):
        simplified_question = question.strip().lower()
        simplified_question = simplified_question.rstrip(':').rstrip('?')
        return simplified_question
    
    for element in form_fields:
        label = soup.find('label', {'for': element.get('id')})
        if not label:
            previous_sibling = element.find_previous_sibling()
            if previous_sibling:
                label = previous_sibling
        if label:
            question = label.get_text(strip=True)
            print(f"Question: {question}")
            simplified_question = simplify_question(question)

            for field, variations in question_list.items():
                if simplified_question in [simplify_question(q) for q in variations]:
                    print(f"Found a {field} question: {question}")
else:
    print(f"Failed to retrieve page: {response.status_code}")

