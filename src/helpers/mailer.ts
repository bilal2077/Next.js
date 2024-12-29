import User from '@/helpers/mailer';
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";




export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
   const  hashedToken = await bcryptjs.hash(userId, 10);


    if(emailType === "verify"){
      await User.findByIdAndUpdate(userId, 
        {verifyToken: hashedToken, verifyTokenExpire: Date.now() + 3600000});
    } else if(emailType === "reset"){
      await User.findByIdAndUpdate(userId, 
        {forgotPasswordToken: hashedToken, forgotPasswordExpire: Date.now() + 3600000});
      
 // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "201a7bceb2be69",
    pass: "********14cc"
  }
});

    const mailOptions = {
      from: "chentomy33@gmal.com",
      to: email,
      subject: emailType === "verify"    ? "Verify Your Email" : " reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`
    
  };

  const mailResponse = await transport.sendMail(mailOptions);
  return mailResponse;
}}
 catch (error: any) {
  throw new Error(error.message);
}
};
