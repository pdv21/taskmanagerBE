const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendResetEmail = async (to, resetLink) => {
    try {
        console.log("📨 Sending mail to:", to);
        console.log("🔗 Reset link:", resetLink);

        const info = await transporter.sendMail({
            from: `"Task Manager" <${process.env.EMAIL_USER}>`,
            to,
            subject: '🔐 Reset your password',
            html: `<a href="${resetLink}">Reset Password</a>`
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