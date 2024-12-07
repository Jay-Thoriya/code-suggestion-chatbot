## Getting Started
  
# **Code Suggestion Chatbot**

This is an AI-powered chatbot designed to analyze code and provide performance improvement suggestions. It features a clean, interactive user interface and integrates modern frameworks and libraries for seamless user experience.

---

## **Table of Contents**

1. [How to Run the Project](#how-to-run-the-project)  
2. [Design Choices](#design-choices)  
3. [Assumptions and Limitations](#assumptions-and-limitations)  
4. [Screenshots](#screenshots)  
5. [Technologies Used](#technologies-used)

---

## **How to Run the Project**

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (v16 or above)
- **Python** (3.8 or above)
- **pip** (Python package installer)

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/code-suggestion-chatbot.git
   cd code-suggestion-chatbot
2. Navigate to the backend directory (if separate):
   ```bash
   cd backend
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
4. Run the Flask server:
   ```bash
   python app.py
5. The Flask backend will run on http://127.0.0.1:5000
   
### **Frontend Setup**
1. Navigate to the frontend directory (or root if integrated):
   ```bash
   cd frontend
2. Install dependencies:
   ```bash
   npm install
3. Run the development server:
   ```bash
   npm run dev
4. The application will be accessible at http://localhost:3000.

### **Design Choices**

1. Frontend Framework:
    * Used React with Next.js for server-side rendering and optimized performance.
    * Styled using CSS for clean and responsive design.
2. Backend Framework:
    * Chose Flask for simplicity and integration with OpenAI API for processing user input and generating suggestions.
3. Data Handling:
    * Suggestions generated dynamically using the OpenAI model based on user input.
4. User Experience:
    * Designed a minimalistic interface with a focus on usability.
    * Added feedback mechanisms, such as loading indicators and error messages.


### **Assumptions and Limitations**

1. Assumptions :
     * The chatbot assumes the provided input is valid code.
     * Users are expected to input code snippets in commonly used programming languages.
2. Limitations :
     * Performance heavily relies on the OpenAI API response time.
     * Limited to analyzing and providing suggestions for code snippets under 2,000 characters.
     * No offline functionality as it depends on an active internet connection.


### **Screenshots**

### Home Page

![image](https://github.com/user-attachments/assets/18f19cee-b6aa-4dc8-b165-6db28488e214)

### Code Analysis

![WhatsApp Image 2024-12-07 at 23 12 03_dca41ec5](https://github.com/user-attachments/assets/7c5a2321-dcf4-413c-b464-330432e29088)

![image](https://github.com/user-attachments/assets/a326f907-b778-4400-a9bc-eabaa52fd683)


### Suggestions

![WhatsApp Image 2024-12-07 at 23 30 24_ef3b386b](https://github.com/user-attachments/assets/799daaf5-b050-4b88-9619-8a6156442914)

![WhatsApp Image 2024-12-07 at 23 57 22_3a30effe](https://github.com/user-attachments/assets/a030a23a-1938-442e-a1c2-0fbaffe50778)

![WhatsApp Image 2024-12-07 at 23 57 42_a4bbf9c2](https://github.com/user-attachments/assets/f098b0e3-2d41-4e79-9d72-48ea0b32467b)


### **Technologies Used**

## Frontend 
  * React (v19.0.0)
  * Next.js (v15.0.4)
  * TypeScript
  * Prism.js for syntax highlighting
## Backend
  * Flask (Python)
  * OpenAI API
## Other Libraries
  * Lucide-React: Used for icons and UI components.
  * ESLint: For linting and code quality.

