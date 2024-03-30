import * as nodemailer from 'nodemailer';

export function sendEmail(email: string, username: string): void {
  const transporter = nodemailer.createTransport({
    service: ' outlook',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: `Welcome to our platform, ${username}!`,
    html: `<h1>API Login</h1> <p>Welcome to our platform ${username}, we are very happy to have you with us.</p> </br> <p>If you were not the one who registered on our website, please contact us by email at raijoiamv@gmail.com</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending failed:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}