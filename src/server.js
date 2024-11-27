const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/email', async (req, res) => {
  try {
    const { nombre, correo, telefono, dias, noches, adultos, ninos, fechaInicial, transporte, hoteles, restaurantes, atractivos, agenciaCorreo } = req.body;

    if (!agenciaCorreo) {
      return res.status(400).send('Por favor, seleccione una agencia antes de enviar el formulario.');
    }

    console.log('Datos recibidos:', req.body);

    const mailOptions = {
      from: 'explora.dolores.hidalgo@gmail.com',
      to: agenciaCorreo,
      subject: 'Solicitud de Paquete Turístico Personalizado',
      text: `
        Información de Contacto:
        Nombre: ${nombre || 'No se proporcionó nombre'}
        Correo: ${correo || 'No se proporcionó correo'}
        Teléfono: ${telefono || 'No se proporcionó teléfono'}

        Detalles del Paquete:
        Días: ${dias || 'No se proporcionó cantidad de días'}
        Noches: ${noches || 'No se proporcionó cantidad de noches'}
        Adultos: ${adultos || 'No se proporcionó cantidad de adultos'}
        Niños: ${ninos || 'No se proporcionó cantidad de niños'}
        Fecha Inicial: ${fechaInicial || 'No se proporcionó fecha inicial'}
        Transporte: ${transporte || 'No se proporcionó información de transporte'}

        Hoteles Seleccionados: ${hoteles && hoteles.length ? hoteles.map(h => h.nombre).join(', ') : 'No se proporcionaron hoteles'}
        Restaurantes Seleccionados: ${restaurantes && restaurantes.length ? restaurantes.map(r => r.nombre).join(', ') : 'No se proporcionaron restaurantes'}
        Atractivos Seleccionados: ${atractivos && atractivos.length ? atractivos.map(a => a.nombre).join(', ') : 'No se proporcionaron atractivos'}
      `
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'explora.dolores.hidalgo@gmail.com',
        pass: 'mzvyaekzrgbzjvyp' // Nueva contraseña de aplicación
      }
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error('Error al verificar la configuración del transportador:', error);
      } else {
        console.log('Configuración del transportador verificada con éxito');
      }
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).send('Error al enviar el correo');
      }
      console.log('Correo enviado con éxito:', info.response);
      res.status(200).json({ message: 'Correo enviado con éxito' });
    });
  } catch (err) {
    console.error('Error en el servidor:', err);
    res.status(500).send('Error en el servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
