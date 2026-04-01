const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendResetEmail = async (to, resetLink) => {
    try {
        const html = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
            <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px;">
                
                <h2 style="text-align: center;">🔐 Reset Your Password</h2>

                <p>
                    You requested to reset your password.
                </p>

                <div style="text-align: center; margin: 20px 0;">
                    <a href="${resetLink}" 
                       style="background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px;">
                        Reset Password
                    </a>
                </div>

                <p>This link will expire in 15 minutes.</p>
            </div>
        </div>
        `;

        await resend.emails.send({
            from: "onboarding@resend.dev", // dùng tạm domain của Resend
            to,
            subject: "Reset your password",
            html
        });

        console.log("✅ Email sent to:", to);

    } catch (err) {
        console.error("❌ Send mail error:", err);
    }
};

module.exports = {
    sendResetEmail
};