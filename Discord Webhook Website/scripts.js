// scripts.js

// Function to send a message

function sendMessage() {
    const webhookInput = document.getElementById('webhook');
    const messageInput = document.getElementById('message');

    const webhookUrl = webhookInput.value;
    const message = messageInput.value;

    if (!webhookUrl || !message) {
        alert('Webhook URL and message are required.');
        return;
    }

    // Save the last used webhook URL to local storage
    localStorage.setItem('lastWebhook', webhookUrl);

    const payload = {
        webhookUrl: webhookUrl,
        message: message,
    };

    fetch('http://localhost:3000/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Message sent:', data);
            alert('Message sent successfully!');
        } else {
            throw new Error(`Error: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Error sending message:', error);
        alert(`Error sending message: ${error.message}`);
    });
}


// Set the last used webhook URL if available in local storage
document.addEventListener('DOMContentLoaded', function () {
    const lastWebhook = localStorage.getItem('lastWebhook');
    if (lastWebhook) {
        document.getElementById('webhook').value = lastWebhook;
    }
});
