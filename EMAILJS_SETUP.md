# EmailJS Setup Guide for Esnaad Legal Contact Form

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Create a free account (100 emails/month free tier)
3. Verify your email address

## Step 2: Set up Email Service

1. Go to EmailJS Dashboard > Email Services
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your business email account (info@esnaadlegal.com)
5. Note down the **Service ID** (e.g., "service_esnaad_legal")

## Step 3: Create Email Template

1. Go to EmailJS Dashboard > Email Templates
2. Click "Create New Template"
3. Use this template content:

### Template Subject:

```
New Contact Form Submission - {{from_name}}
```

### Template Body:

```html
<!DOCTYPE html>
<html>
  <body>
    <h2>New Contact Form Submission</h2>

    <p><strong>From:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Phone:</strong> {{phone}}</p>
    <p><strong>Service Requested:</strong> {{service}}</p>
    <p><strong>Preferred Contact Method:</strong> {{preferred_contact}}</p>

    <h3>Message:</h3>
    <p>{{message}}</p>

    <hr />
    <p>
      <em
        >This message was sent through the Esnaad Legal website contact
        form.</em
      >
    </p>
  </body>
</html>
```

4. Set "Reply-To" field to: {{reply_to}}
5. Save the template and note down the **Template ID** (e.g., "template_contact_form")

## Step 4: Get Public Key

1. Go to EmailJS Dashboard > Account > General
2. Copy your **Public Key** (e.g., "user_xyz123")

## Step 5: Update Environment Variables

Create a `.env` file in your project root and add:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Update Configuration

Edit `/src/config/emailConfig.js` and replace the placeholder values with your actual EmailJS credentials.

## Step 7: Test the Form

1. Fill out the contact form on your website
2. Check your business email for the message
3. Verify all fields are populated correctly

## Security Notes

- Never commit your EmailJS credentials to version control
- Use environment variables for production
- Consider rate limiting to prevent abuse
- EmailJS free tier has a 100 emails/month limit

## Auto-Reply Setup (Optional)

To send auto-replies to customers:

1. Create a second email template for auto-replies
2. Set up a second EmailJS service call in the ContactForm component
3. Send confirmation emails to customers when they submit the form

## Production Deployment

When deploying to production platforms:

- **Netlify/Vercel**: Add environment variables in the platform's dashboard
- **Server**: Set environment variables in your hosting configuration

Your contact form is now fully functional and will send emails directly to your business email address!
