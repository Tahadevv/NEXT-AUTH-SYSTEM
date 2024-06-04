import User from '@/models/useModel';
import { error } from 'console';
import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs"

export const sendEmail = async({email, emailType, userId}: any) => {


    try{

      const hashedToken = await bcryptjs.hash(userId.toString(), 10)

      if (emailType === "VERIFY") {
        const updatedUser = await User.findByIdAndUpdate(userId,
          {
            $set:{
            verifyToken: hashedToken,  verifyTokenExpiry: Date.now() + 3600000
            }
          })
      } else if (emailType === "RESET") {
        await User.findByIdAndUpdate(userId,
          {
            $set:{
            verifyToken: hashedToken,  verifyTokenExpiry: Date.now() + 3600000
            }
          })
      } 



      var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "fc51496540df64",
          pass: "0868430e872519"
        }
      });

        const mailOptions = {
            from: 'taha', 
            to: email, 
            subject: emailType === 'VERIFY' ? "Verify your email" : "rest your password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password" } 
            or copy paste the link in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>
            `, // html body
          } 

          const mailresponse = await transporter.sendMail
        (mailOptions);
        return mailresponse; 

    }
    catch(err:any){
        throw new Error(err.message)
        


    }
}