
const nodemailer = require('nodemailer');
export const transporter = nodemailer.createTransport({
    service: "Gmail",
    host:"smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user:"rskoba144@gmail.com",
        pass:"tspqqrwtbppoziav",
    },
    tls:{
        rejectUnauthorized: false,
    },
});
transporter.verify().then(()=>{
    console.log('Ready to send mails');
})