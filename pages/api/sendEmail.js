// pages/api/sendEmail.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEmail(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    const content = {
      to: 'vplaycrypto@gmail.com', // Sending to your own email for demonstration
      from: 'youremail@example.com', // This needs to be an email you verified with SendGrid
      subject: 'New VPLAY Community Sign-Up',
      text: `A new user signed up with the email: ${email}`,
      html: `<strong>A new user signed up with the email: ${email}</strong>`
    };

    try {
      await sgMail.send(content);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
      res.status(500).send('Error sending email');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
