const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendResetEmail = async (to, resetLink) => {
    try {
        const html = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
            <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                
                <h2 style="color: #333; text-align: center;">🔐 Reset Your Password</h2>
                
                <p style="color: #555; font-size: 14px;">
                    Hi there 👋,<br><br>
                    You requested to reset your password. Click the button below to proceed.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" 
                       style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                        Reset Password
                    </a>
                </div>

                <p style="color: #999; font-size: 13px;">
                    This link will expire in <b>15 minutes</b>.
                </p>

                <p style="color: #999; font-size: 13px;">
                    If you didn’t request this, you can safely ignore this email.
                </p>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

                <p style="font-size: 12px; color: #aaa; text-align: center;">
                    © 2026 Task Manager. All rights reserved.
                </p>
            </div>
        </div>
        `;

        await transporter.sendMail({
            from: `"Task Manager" <${process.env.EMAIL_USER}>`,
            to,
            subject: '🔐 Reset your password',
            html
        });

        console.log('✅ Email sent to:', to);

    } catch (err) {
        console.error('❌ Send mail error:', err);
    }
};

module.exports = {
    sendResetEmail
};