const nodeMailer = require('nodemailer');
require('dotenv/config');

exports.sendMail = (UserEmail, subject, htmlContent) => {
    const transport = nodeMailer.createTransport({
        host: process.env.Mail_HOST,
        port: process.env.Mail_Prot,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.MPass,
        }
    })

    const options = {
        from: process.env.FROM_ADDRESS,
        to: UserEmail,
        subject: subject,
        html: htmlContent
    }
    return transport.sendMail(options);
}