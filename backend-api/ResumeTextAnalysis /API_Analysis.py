import os
import requests
import pdfplumber
from docx import Document
import sys
#  HOW TO RUN: python API_Analysis.py functionalsample.pdf
# Load the DeepSeek API key securely from environment variables
API_KEY = os.getenv("DEEPSEEK_API_KEY")

# Exit the program if the API key is not found
if not API_KEY:
    print("Error: Deepseek API key not found. Set DEEPSEEK_API_KEY in your environment variables.")
    sys.exit(1)

# URL for the DeepSeek API endpoint
DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions"

# Set up headers for API requests
headers = {
    "Authorization": f"Bearer {API_KEY}",  # Include the API key in the Authorization header
    "Content-Type": "application/json"  # Specify that the data format is JSON
}


# Function to extract text from PDF or DOCX files
def extract_text(filepath):
    try:
        # Handle PDF files
        if filepath.lower().endswith('.pdf'):
            with pdfplumber.open(filepath) as pdf:
                # Extract and join text from all pages
                text = '\n'.join(page.extract_text() or "" for page in pdf.pages)
        # Handle DOCX files
        elif filepath.lower().endswith('.docx'):
            doc = Document(filepath)
            # Extract and join text from paragraphs
            text = '\n'.join(para.text for para in doc.paragraphs)
        # Raise an error for unsupported file types
        else:
            raise ValueError("Unsupported file type. Please provide a PDF or DOCX file.")

        # Check if the extracted text is empty and raise an error if so
        if not text.strip():
            raise ValueError("The file is readable, but contains no extractable text.")

        return text
    # Handle any exception that occurs during extraction
    except Exception as e:
        raise RuntimeError(f"Extraction failed: {e}")


# Function to interact with the DeepSeek API to optimize resumes
def optimize_resume(resume_text):
    try:
        # Prepare the prompt for the API
        prompt = (
            "Analyze the following resume and provide a concise summary "
            "of actionable improvements to optimize it:\n\n"
            f"{resume_text}"
        )

        # Construct the API request payload
        data = {
            "model": "deepseek-chat",  # Specify the model for DeepSeek
            "messages": [{"role": "user", "content": prompt}],  # Provide the prompt in chat format
            "temperature": 0.3,  # Set the temperature for response randomness
            "max_tokens": 500,  # Limit the response to a maximum number of tokens
        }

        # Send the POST request to the API
        response = requests.post(DEEPSEEK_API_URL, headers=headers, json=data)
        # Raise an error if the response status code indicates failure
        response.raise_for_status()

        # Parse the response JSON
        result = response.json()

        # Extract optimization suggestions from the response
        suggestions = result.get("choices", [{}])[0].get("message", {}).get("content")
        # Check if the response is empty and raise an error if no suggestions are found
        if not suggestions:
            raise RuntimeError("Got an empty response from DeepSeek API.")

        return suggestions
    # Handle various errors, including API request failures and invalid response structures
    except requests.RequestException as e:
        raise RuntimeError(f"API Request failed: {e}")
    except (ValueError, KeyError, IndexError) as e:
        raise RuntimeError(f"Invalid response structure: {e}")


# Entry point of the script
if __name__ == "__main__":
    # Verify that a file path is provided as a command-line argument
    if len(sys.argv) != 2:
        print("Usage: python optimize_resume.py <resume-file.pdf|docx>")
        sys.exit(1)

    # Get the file path from the command-line arguments
    filepath = sys.argv[1]

    try:
        # Extract text from the provided file
        resume_text = extract_text(filepath)
        # Send the text to the DeepSeek API for optimization suggestions
        feedback = optimize_resume(resume_text)
        # Print the received optimization feedback
        print("\nOptimization Suggestions:\n")
        print(feedback)
    # Handle any errors that occur during the process
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)