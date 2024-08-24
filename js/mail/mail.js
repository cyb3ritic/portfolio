

document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS with your Public Key
    emailjs.init('JIS1fPtvdAXDmL7OZ');
});

function sendEmail(event) {
    event.preventDefault();

    // Get the form elements
    const form = document.getElementById('contact-form');
    const name = sanitizeInput(document.getElementById('name').value.trim());
    const email = sanitizeInput(document.getElementById('email').value.trim());
    const subject = sanitizeInput(document.getElementById('subject').value.trim());
    const message = sanitizeInput(document.getElementById('message').value.trim());

    // Basic client-side validation
    const validationResult = validateForm(name, email, subject, message);
    if (!validationResult.isValid) {
        displayMessage(validationResult.message, 'error');
        return;
    }

    // Disable the submit button to prevent multiple submissions
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Prepare the parameters to send to EmailJS
    const templateParams = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    };

    // Send the email using EmailJS
    emailjs.send('service_62bswkk', 'template_taab8ah', templateParams)
        .then(function(response) {
            displayMessage('🎉 Woohoo! Your message has been sent successfully!', 'success');
            console.log('SUCCESS!', response.status, response.text);

            // Reset the form after the message is sent
            form.reset();
        })
        .catch(function(error) {
            displayMessage('😕 Uh-oh! Something went wrong on our end. Please try again later.', 'error');
            console.error('FAILED...', error);
        })
        .finally(function() {
            // Re-enable the submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
}

// Function to sanitize user input to prevent XSS attacks
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Function to validate form fields
function validateForm(name, email, subject, message) {
    if (!name) {
        return { isValid: false, message: '🙃 Hey there! Don\'t forget to tell us your name.' };
    }

    if (!email) {
        return { isValid: false, message: '📧 Oops! We need your email to get back to you.' };
    }

    // Regular expression for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        return { isValid: false, message: '🤔 Hmm... That doesn\'t look like a valid email address.' };
    }

    if (!subject) {
        return { isValid: false, message: '📝 What\'s the subject of your message? Please fill it in!' };
    }

    if (!message) {
        return { isValid: false, message: '✍️ Got a message for us? We\'d love to hear it! Please write something.' };
    }

    return { isValid: true, message: '' };
}

// Function to display feedback messages
function displayMessage(message, type) {
    const form = document.getElementById('contact-form');
    let messageDiv = document.getElementById('form-message');

    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'form-message';
        form.appendChild(messageDiv);
    }

    messageDiv.textContent = message;
    messageDiv.className = type;  // Add a class based on the message type ('success' or 'error')

    // Add a little animation
    messageDiv.style.opacity = 0;
    messageDiv.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        messageDiv.style.opacity = 1;
    }, 50);

    // Automatically hide the message after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}
