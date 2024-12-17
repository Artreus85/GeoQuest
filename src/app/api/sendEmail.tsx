import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { email, message } = req.body;

    // Configure Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER, // Set this in Firebase environment variables
        pass: process.env.EMAIL_PASS, // Set this in Firebase environment variables
      },
    });

    // Configure email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Recipient's email
      subject: 'Contact Form Submission',
      text: message,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } 
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
