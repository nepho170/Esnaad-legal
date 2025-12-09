// EmailJS Configuration
// You need to set up an account at https://www.emailjs.com/
// Then replace these values with your actual EmailJS credentials

export const emailConfig = {
    // Your EmailJS service ID (from EmailJS dashboard)
    serviceId: 'service_sara',

    // Your EmailJS template ID (from EmailJS dashboard)
    templateId: 'template_edvmgek',

    // Your EmailJS public key (from EmailJS dashboard)
    publicKey: 'uVnsdM3DS_iEhpm92',

    // Your business email where you want to receive messages
    businessEmail: '2lhashmiii@gmail.com'
};

// EmailJS template variables that should be configured in your EmailJS template:
// {{from_name}} - Sender's full name
// {{from_email}} - Sender's email address
// {{phone}} - Sender's phone number
// {{service}} - Selected service
// {{preferred_contact}} - Preferred contact method
// {{subject}} - Email subject
// {{preferred_time}} - Preferred contact time
// {{message}} - Message content
// {{to_email}} - Your business email (destination)

export default emailConfig;