const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const nodemailer = require('nodemailer');

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

        console.log("✅ Message sent:", response.messageId);
        console.log("📬 Response:", response.response);
        console.log("📦 Accepted:", response.accepted);
        console.log("❌ Rejected:", response.rejected);

    } catch (err) {
        console.error("❌ Send mail error FULL:", err);
    }
};

module.exports = {
    sendResetEmail
};