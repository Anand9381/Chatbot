# AI Chatbot Application

A beautiful, real-time AI chatbot application built with Python, Flask, and the Groq API. This project provides a seamless conversational interface powered by the `llama-3.1-8b-instant` model.

## Features

- **Real-Time Conversational UI**: A modern, responsive chat interface built with HTML, CSS, and Vanilla JavaScript.
- **Fast AI Responses**: Powered by the Groq API utilizing the Llama 3.1 8B model for incredibly fast inference.
- **Markdown Support**: The chat interface automatically parses and renders markdown formatting (bold text, code blocks, inline code, etc.).
- **Typing Indicators**: Visual feedback while waiting for the AI to generate a response.
- **Chat History Management**: Option to easily clear the current chat session.

## Tech Stack

- **Backend**: Python, Flask
- **Frontend**: HTML5, CSS3, JavaScript
- **AI Integration**: Groq API (`llama-3.1-8b-instant`)

## Prerequisites

Before running this application, ensure you have the following installed:
- Python 3.8 or higher
- A Groq API key

## Installation & Setup

1. **Clone or Download the Repository**

2. **Navigate to the Project Directory**
   ```bash
   cd chatbot_app
   ```

3. **Create a Virtual Environment (Recommended)**
   ```bash
   python -m venv venv
   ```

4. **Activate the Virtual Environment**
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

5. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

6. **Configure Environment Variables**
   Create a `.env` file in the root directory (if not already present) and add your Groq API key:
   ```env
   GROQ_API_KEY=your_actual_api_key_here
   ```

## Running the Application

1. Make sure your virtual environment is activated.
2. Start the Flask server:
   ```bash
   python app.py
   ```
3. Open your web browser and navigate to:
   **http://127.0.0.1:5000**

## Project Structure

```text
chatbot_app/
│
├── .env                # Environment variables (API Key)
├── app.py              # Main Flask application backend 
├── requirements.txt    # Python dependencies
├── test_groq.py        # Utility script to test the Groq API connection
│
├── static/             # Frontend static files
│   ├── script.js       # Chat logic, API calls, and markdown parsing
│   └── style.css       # Beautiful UI styling
│
└── templates/          # HTML templates
    └── index.html      # Main chat interface layout
```

## License
Feel free to use and modify for your resume, portfolio, or personal projects!
