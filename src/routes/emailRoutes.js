const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { emailConfig } = require('../config/emailConfig');

const transporter = nodemailer.createTransport(emailConfig);

router.post('/', (req, res) => {
  const { to, subject, message } = req.body;

  const mailOptions = {
    from: emailConfig.auth.user,
    to: to,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error); // Registra el error
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Correo enviado con éxito');
  });
});

module.exports = router;
