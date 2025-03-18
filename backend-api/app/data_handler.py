import re
from pdf_extractor import extract_text_from_pdf

def extract_data(pdf_path):
    """
    Extracts specific data from a PDF file using pdf_extractor.
    Returns a dictionary containing the extracted data, or an empty dictionary if no data is found.
    """
    extracted_text = extract_text_from_pdf(pdf_path)
    if extracted_text:
        return _parse_extracted_text(extracted_text)  # Calls the text parsing function
    else:
        return {}  # Returns an empty dictionary if no text was extracted

def _parse_extracted_text(text):
    """
    Parses the extracted text to extract specific data using regular expressions.
    This is a helper function, therefore it is named with a leading underscore.
    Returns a dictionary containing the extracted data.
    """
    data = {}

    # Extracting Name
    name_match = re.search(r"IM\s+A\s+\.\s*(.*)", text)
    if name_match:
        data['name'] = name_match.group(1).strip()

    # Extracting Email
    email_match = re.search(r"([\w\.-]+@[\w\.-]+)", text)
    if email_match:
        data['email'] = email_match.group(1).strip()

    # Extracting Phone Number
    phone_match = re.search(r"\(?(\d{3})\)?[-.\s]*(\d{3})[-.\s]*(\d{4})", text)
    if phone_match:
        data['phone'] = f"{phone_match.group(1)}-{phone_match.group(2)}-{phone_match.group(3)}"

    # Extracting Address
    address_match = re.search(r"(\d+\s+\w+\s+\w+.*?\d{5})", text, re.DOTALL)
    if address_match:
        data['address'] = address_match.group(1).replace('\n', ' ').strip()

    return data

def process_data(data):
    """
    Performs further processing or actions with the extracted data.
    """
    if data:
        print("Extracted Data:")
        print(data)
        #  Future auto-filling logic
    else:
        print("No data to process.")

if __name__ == '__main__':
    # Example usage
    pdf_file = "resume-sample.pdf"  # Test PDF path
    extracted_data = extract_data(pdf_file)
    process_data(extracted_data)