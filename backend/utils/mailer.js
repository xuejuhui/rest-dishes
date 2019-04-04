const nodemailer = require("nodemailer");
const { SMTP_URL } = process.env;



async function sendEmail(emailContent,  from, smtpUrl=SMTP_URL) {
  try {
    const fullEmailContent = {...from,...emailContent}
    console.log(fullEmailContent)
    // const transporter = nodemailer.createTransport(SMTP_URL);
    let account = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass // generated ethereal password
      }
    });

    const info = await transporter.sendMail(fullEmailContent)

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (e) {
    console.log(e)
  }

}

module.exports ={
  sendEmail
}
