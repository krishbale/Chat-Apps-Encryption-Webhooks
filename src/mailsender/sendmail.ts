"use strict";
const nodemailer = require("nodemailer");

 const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 465,
  secure: false,
  auth: {
  
    user: 'kaela.kiehn98@ethereal.email',
    pass: 'tFjBsv5g2YdjVPPDvp'
  },
  
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendmail(to:string,text:string,) {
  
  const info = await transporter.sendMail({
    from: 'kaela.kiehn98@ethereal.email', // sender address
    to: to, 
    subject: "Email verification", 
    text: text, 
    html: `<b>Hello Please verify your email ${text}</b>`, 
  });

  console.log("Message sent: %s", info.messageId);
 
}

