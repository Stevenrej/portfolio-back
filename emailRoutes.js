const Mailgun = require('mailgun-js');

const mailgun = new Mailgun({ apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN });

async function sendEmail(req, res) {
  try {
    let { name, email, message } = req.body;

    const msg = {
      to: 'steveo732@gmail.com',
      from: 'message@portfolio.com',
      subject: 'Message from ' + name,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}`,
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
    };

    mailgun.messages().send(msg, (error, body) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred' });
      } else {
        res.send({ message: 'Email sent successfully', msg });
        console.log(msg.text);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
}

module.exports = { sendEmail };
