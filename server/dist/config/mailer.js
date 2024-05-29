"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require('nodemailer');
exports.transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "rskoba144@gmail.com",
        pass: "tspqqrwtbppoziav",
    },
    tls: {
        rejectUnauthorized: false,
    },
});
exports.transporter.verify().then(() => {
    console.log('Ready to send mails');
});
