from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load OpenAI API key
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Analyze the code using OpenAI

def ai_analyze_code(code):
    try:
        messages = [
            {"role": "system", "content": "You are a highly skilled AI assistant specializing in software performance optimization.\
              Your job is to thoroughly analyze code snippets and provide expert suggestions to improve performance, efficiency, and readability."},
            {"role": "user", "content": f"Analyze the following code snippet and identify any performance bottlenecks, inefficiencies, or\
              opportunities for optimization. Provide clear, actionable suggestions and explain the reasoning behind them.\
              Consider algorithmic optimizations, time complexity, space complexity, and any improvements related to code readability or\
              maintainability.\n\nCode:\n{code}"}
        ]
        response = openai.ChatCompletion.create(
            model="gpt-4",  # Use the latest model for better results
            messages=messages,
            temperature=0.5  # Adjust temperature based on how creative you want the suggestions
        )
        return response.choices[0].message['content'].strip()
    except Exception as e:
        print("Error in OpenAI API call:", str(e))
        return "An error occurred while processing your request."



@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        code = request.json.get("code", "")
        suggestions = ai_analyze_code(code)
        # Wrap the suggestions in a list if needed
        return jsonify({"suggestions": [suggestions] if isinstance(suggestions, str) else suggestions})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred while analyzing the code."}), 500


if __name__ == "__main__":
    app.run(debug=True)
