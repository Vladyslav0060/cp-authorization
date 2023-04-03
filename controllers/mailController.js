const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "vladyslav0060mailer@gmail.com",
    pass: "Mailer1_2_3",
  },
  secure: true,
});
class mailController {
  sendMail = (req, res) => {
    const { to, subject, text } = req.body;
    const mailData = {
      from: "vladyslav0060mailer@gmail.com",
      to: "Vlad.bortnik1@gmail.com",
      subject: subject,
      text: text,
      html: `<b>Hey there! </b><br> You got a new message from crypto-app</br><br>User ${subject} (${to}) has send a message to you:<br/><br>${text}</br>`,
    };

    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res
        .status(200)
        .send({ message: "Mail send", message_id: info.messageId });
    });
  };
}
module.exports = new mailController();
