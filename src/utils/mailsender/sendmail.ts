import { SMTP } from 'src/constant';
import * as nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: SMTP.host,
  port: SMTP.port,
  secure: SMTP.secure,
  auth: {
    user: SMTP.user,
    pass: SMTP.pass,
  },
});

export async function sendmail(to: string, text: string) {
  const info = await transporter.sendMail({
    from: SMTP.Sender, // sender address
    to: to, // user email address that we want to send OTP
    subject: 'Email verification',
    text: text,
    html: `<b>Hello Please verify your email ${text}</b>`,
  });

  // console.log('Message sent: %s', info.messageId);
}
