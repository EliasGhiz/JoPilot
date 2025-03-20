# JoPilot

## Overview

JoPilot is a web application designed to assist with job applications. It consists of three main components:
1. **Backend API**: A Flask-based API that serves data to the frontend.
2. **Frontend**: A React-based web application that interacts with the backend API.
3. **JoPilot Extension**: A browser extension that provides additional functionality related to job applications.

## Setup Instructions

### Prerequisites

- Python 3.x
- Node.js and npm
- A web browser (for testing the extension)

### Backend API

1. **Navigate to the backend directory**:
    ```sh
    cd backend-api
    ```

2. **Create a virtual environment**:
    ```sh
    python -m venv venv
    ```

3. **Activate the virtual environment**:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```

4. **Install the required packages**:
    ```sh
    pip install -r requirements.txt
    ```

5. **Run the Flask application**:
    ```sh
    python run.py
    ```

    The backend API will be available at `http://localhost:5000`.

#### Issues:

1. **ImportError: cannot import name 'url_quote' from 'werkzeug.urls' when starting run.py**
    ```sh
    pip install Flask==3.0.3
    ```

### Frontend

1. **Navigate to the frontend directory**:
    ```sh
    cd frontend
    ```

2. **Install the required packages**:
    ```sh
    npm install
    ```

3. **Run Development Server**:
    ```sh
    npm run dev
    ```
    
### JoPilot Extension

1. **Navigate to the extension directory**:
    ```sh
    cd joPilot_extension
    ```

2. **Load the extension in your browser**:
    - Open your browser and navigate to the extensions page.
    - Enable "Developer mode".
    - Click "Load unpacked" and select the `joPilot_extension` directory.

    The extension will be available in your browser.

## Testing

To test the entire setup:
1. Start the backend API.
2. Start the frontend application.
3. Load the JoPilot extension in your browser.
4. Open the frontend application in your browser and interact with it to see data fetched from the backend API.
5. Use the JoPilot extension to test its functionality.