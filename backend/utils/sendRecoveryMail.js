const sendgrid = require("@sendgrid/mail");

const sendRecoveryMail = async (email, code) => {

  sendgrid.setApiKey(process.env.EMAIL_API_KEY);

  const message = {
      to: email,
      from: `${process.env.SENDGRID_EMAIL}`,
      subject: 'Recover account',
      text: `Tu código de recuperación es: ${code}`,
      html: `
      <div>
        <h1> Recupera tu cuenta </h1>
        <p> Si has pedido un cambio de contraseña, por favor introduce el siguiente código. Si no lo has hecho
        ignora este mensaje </p>

        ${code}
      </div>
    `,
  };

  // Enviar mensaje
  await sendgrid.send(message);
  
}

module.exports = sendRecoveryMail