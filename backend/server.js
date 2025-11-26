const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail', // or 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { fullName, email, phone, service, preferredContact, message } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'info@esnaadlegal.com', // Your business email
            replyTo: email,
            subject: `New Contact Form Submission - ${fullName}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Requested:</strong> ${service}</p>
        <p><strong>Preferred Contact Method:</strong> ${preferredContact}</p>
        <h3>Message:</h3>
        <p>${message}</p>
        <hr>
        <p><em>This message was sent through the Esnaad Legal website contact form.</em></p>
      `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });

    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});