const nodemailer=require('nodemailer');

const SendEmail=async (EmailTo, EmailSubject, EmailText)=>{
    const transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:true,
        auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASSWORD}
    });

    const mailOptions={
        from:'Noakhali Sell Bazar <'+ process.env.SMTP_USER +'>',
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText
    }

    return await transporter.sendMail(mailOptions);
}

module.exports=SendEmail;