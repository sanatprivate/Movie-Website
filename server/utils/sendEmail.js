const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // const testAccount = await nodemailer.createTestAccount();

    // Create a transporter object
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: process.env.SMTP_PORT || 587,
        auth: {
            user: process.env.SMTP_EMAIL || 'ethereal.user@ethereal.email', // Replace with valid email in prod
            pass: process.env.SMTP_PASSWORD || 'ethereal.pass', // Replace with valid password in prod
        },
    });

    // Define the email options
    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html, // Optional: for HTML emails
    };

    // Send the email
    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
