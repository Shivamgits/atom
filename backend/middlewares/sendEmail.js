const nodeMailer = require('nodemailer');

exports.sendEmail = async (options) => {

    // const transporter = nodeMailer.createTransport({

    //     host: process.env.SMPT_HOST,
    //     port: process.env.SMPT_PORT,
    //     auth:{
    //         user: process.env.SMPT_MAIL,
    //         pass: process.env.SMPT_PASSWORD
    //     },
    //  service: process.env.SMPT_SERVICE,
        
    // });
    var transporter = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "fa791c48136bd6",
          pass: "275300a7a61535"
        }
      });

    const mailOptions = {
        from: process.env.SMPT_MAIL ,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
    await transporter.sendMail(mailOptions);
}