import nodemailer from "nodemailer";

// NOTE: For real email sending, the user should provide SMTP credentials.
// For now, this is a placeholder using Gmail service as an example.
// The user will need to enable "App Passwords" if using Gmail.

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your app password
    },
});

export const sendResetEmail = async (email, resetLink) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Your Password - AI Resume Builder",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded: 8px;">
        <h2 style="color: #22c55e; text-align: center;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>You requested to reset your password for your AI Resume Builder account. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold;">Reset Password</a>
        </div>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>Best regards,<br>The AI Resume Builder Team</p>
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888888; text-align: center;">This is an automated email, please do not reply.</p>
      </div>
    `,
    };

    return transporter.sendMail(mailOptions);
};

export default transporter;
