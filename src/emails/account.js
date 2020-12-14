const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.EMAILAPI)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to : email,
        from: 'minh.pham.ag@gmail.com',
        subject:'Welcome Email',
        text: `Welcome to the app, ${name}. How do you like the app ?`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to : email,
        from: 'minh.pham.ag@gmail.com',
        subject:'We will miss you!',
        text: `Thank you, ${name}. We will miss you!?`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}