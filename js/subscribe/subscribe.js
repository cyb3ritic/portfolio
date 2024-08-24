function subscribe() {
    const emailInput = document.getElementById('subscribe-email');
    const email = emailInput.value.trim();
    const subscribeButton = document.getElementById('subscribe-button');
    const messageDiv = document.getElementById('subscribe-message');

    // Validate email input
    if (!email) {
        displayMessage('📧 Please enter your email to subscribe!', 'error', messageDiv);
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        displayMessage('🤔 That doesn\'t look like a valid email address.', 'error', messageDiv);
        return;
    }

    subscribeButton.disabled = true;
    subscribeButton.textContent = 'Subscribing...';

    // Prepare parameters for EmailJS
    const templateParams = {
        email: sanitizeInput(email), // Sanitize the email input
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            displayMessage('🎉 You\'ve successfully subscribed to the newsletter!', 'success', messageDiv);
            console.log('SUCCESS!', response.status, response.text);
            emailInput.value = ''; // Clear the input
            
            // Send the email to Google Sheets
            addSubscriberToSheet(email);
        })
        .catch(function(error) {
            displayMessage('😕 Oops! Something went wrong. Please try again later.', 'error', messageDiv);
            console.error('FAILED...', error);
        })
        .finally(function() {
            subscribeButton.disabled = false;
            subscribeButton.textContent = 'Subscribe';
        });
}

// Function to add subscriber to Google Sheets
function addSubscriberToSheet(email) {
    fetch('YOUR_GOOGLE_SHEET_API_URL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: sanitizeInput(email) }), // Sanitize email here as well
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Subscriber added to Google Sheets:', data);
    })
    .catch(error => {
        console.error('Error adding subscriber to Google Sheets:', error);
    });
}

// Function to sanitize input
function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input; // Escapes HTML characters
    return element.innerHTML; // Returns sanitized string
}

// Function to display feedback messages
function displayMessage(message, type, messageDiv) {
    messageDiv.textContent = message;
    messageDiv.className = type; // Set class for styling
    messageDiv.style.opacity = 1;

    // Automatically hide the message after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}
