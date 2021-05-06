let nodemailer = require('nodemailer');
const events = require('events');
const emitter = new events.EventEmitter();


module.exports = (userMail) => {

    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'pero.pandiloski@hotmail.com',
            pass: '123456nodemail*'
        }
    });

    const sendMail = (data) => {
        let message = {
            from: `${data.from}`,
            to: `${data.to}`,
            subject: `${data.subject}`,
            text: `${data.message}`
        };
        transporter.sendMail(message, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    emitter
        .on('blogpost_created', data => {
            sendMail(data)

        })

    emitter.emit('blogpost_created', {
        from: 'pero.pandiloski@hotmail.com',
        to: `${userMail}`,
        subject: "New blogpost created!",
        message: "Successfully created new blogpost"
    })
}

