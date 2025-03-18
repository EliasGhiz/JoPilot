import PyPDF2

def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF file.
    Returns the extracted text, or None if an error occurs.
    """
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page_number in range(len(reader.pages)):
                page = reader.pages[page_number]
                text += page.extract_text() or ""
        return text

    except FileNotFoundError:
        print(f"Error: File not found at {pdf_path}")
        return None

    except Exception as e:
        print(f"An error occurred: {e}")
        return None

if __name__ == '__main__':
    # Example usage for testing
    pdf_file = "resume-sample.pdf"  # test PDF path
    extracted_text = extract_text_from_pdf(pdf_file)
    if extracted_text:
        print("Text extracted successfully.")
        # print the text
        print(extracted_text)
    else:
        print("Text extraction failed.")