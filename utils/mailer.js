const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendResetEmail = async (to, resetLink) => {
    try {
        console.log("📨 Sending mail to:", to);
        console.log("🔗 Reset link:", resetLink);

        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject: "🔐 Reset your password",
            html: `
                <h2>Reset Password</h2>
                <p>Click below to reset:</p>
                <a href="${resetLink}">Reset Password</a>
            `
        });

        console.log("✅ Message sent:", info.messageId);
        console.log("📬 Response:", info.response);
        console.log("📦 Accepted:", info.accepted);
        console.log("❌ Rejected:", info.rejected);

    } catch (err) {
        console.error("❌ Send mail error FULL:", err);
    }
};

module.exports = {
    sendResetEmail
};