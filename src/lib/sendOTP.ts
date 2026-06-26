import { transporter } from "./mail";

export async function sendOTP(
  email: string,
  otp: string
) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,

    to: email,

    subject: "Verify Your Account",

    html: `
      <h2>Your OTP</h2>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
    `,
  });
}