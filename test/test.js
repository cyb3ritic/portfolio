
function sendEmail(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Send the email
    emailjs.send('service_09giycw', 'template_59l0154', {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    }).then((response) => {
        alert('Email sent successfully!');
        document.getElementById('contact-form').reset(); // Reset the form
    }, (error) => {
        alert('Failed to send email. Please try again later.');
        console.error('EmailJS Error:', error);
    });
}


(function(){
    emailjs.init({
      publicKey: "YOUR_PUBLIC_KEY",
    });
 })();