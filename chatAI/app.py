from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)

# Correct CORS configuration - don't add headers elsewhere
CORS(app, 
     supports_credentials=True, 
     origins=["http://localhost:5173"],
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "OPTIONS"])

# Load configuration
with open('config.json') as config_file:
    config = json.load(config_file)

GROQ_API_KEY = config["GROQ_API_KEY"]
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

@app.route('/api/chat/getMessages', methods=['GET'])
def get_messages():
    # Placeholder for fetching messages from a database
    messages = [
        {"text": "Hello! I'm your agriculture assistant. How can I help you today?", "sender": "bot"}
    ]
    return jsonify({"success": True, "messages": messages})

@app.route('/api/chat/saveMessage', methods=['POST'])
def save_message():
    data = request.json
    # Placeholder for saving message to a database
    return jsonify({"success": True})

@app.route('/api/chat/generateResponse', methods=['POST'])
def generate_response():
    data = request.json
    user_message = data.get('message')
    language = data.get('language', 'en-US')
    
    # Determine system message based on language
    if language == 'hi-IN':
        system_message = "आप एक सहायक कृषि सहायक हैं जो किसानों को फसलों, खेती तकनीकों, कीट नियंत्रण, मौसम प्रभावों और टिकाऊ खेती प्रथाओं के बारे में सटीक जानकारी प्रदान करते हैं। कृपया हिंदी में उत्तर दें।"
    else:
        system_message = "You are a helpful agriculture assistant who provides farmers with accurate information about crops, farming techniques, pest control, weather impacts, and sustainable farming practices. Please respond in English."
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "llama3-8b-8192",
        "messages": [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ],
        "temperature": 0.7,
        "max_tokens": 800
    }
    
    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        response_data = response.json()
        
        if 'choices' in response_data and len(response_data['choices']) > 0:
            bot_response = response_data['choices'][0]['message']['content']
        else:
            bot_response = "Sorry, I couldn't generate a response. Please try again." if language == 'en-US' else "क्षमा करें, मैं उत्तर नहीं दे सका। कृपया पुनः प्रयास करें।"
    except Exception as e:
        print(f"Error calling GROQ API: {str(e)}")
        bot_response = "Sorry, I encountered an error. Please try again." if language == 'en-US' else "क्षमा करें, मुझे एक त्रुटि मिली। कृपया पुनः प्रयास करें।"
    
    return jsonify({"success": True, "message": bot_response})

if __name__ == '__main__':
    app.run(debug=True)