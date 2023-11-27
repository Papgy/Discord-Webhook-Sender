# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        data = request.json
        webhook_url = data.get('webhookUrl')
        message = data.get('message')

        if not webhook_url or not message:
            raise ValueError('Webhook URL and message are required.')

        payload = {'content': message}

        response = requests.post(webhook_url, json=payload)
        response.raise_for_status()

        return jsonify({'success': True, 'message': 'Message sent successfully!'})

    except Exception as e:
        return jsonify({'success': False, 'message': f'Error sending message: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(port=3000)
