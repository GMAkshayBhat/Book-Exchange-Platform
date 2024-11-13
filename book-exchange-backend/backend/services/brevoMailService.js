// const defaultClient = SibApiV3Sdk.ApiClient.instance;
require('dotenv').config();
const nodemailer = require('nodemailer');

// Configure transporter for MailerSend SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,
  secure: false,  // Use true if using port 465
  auth: {
    user: 'MS_hRWg9p@trial-0r83ql31oxmgzw1j.mlsender.net',  // SMTP username
    pass: process.env.MAIL_API,  // SMTP password
  },
});

// Function to send password reset email
const sendPasswordResetEmail = async (recipientEmail, resetToken) => {
  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;  // Construct your reset link
  const emailOptions = {
    from: '"Book Exchange Platform" <no-reply@trial-0r83ql31oxmgzw1j.mlsender.net>',  // Sender address
    to: recipientEmail,  // Recipient address
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset. Click this <a href="${resetLink}">link</a> to reset your password.</p>`,
  };

  try {
    const info = await transporter.sendMail(emailOptions);
    console.log('Password reset email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

module.exports = { sendPasswordResetEmail };
