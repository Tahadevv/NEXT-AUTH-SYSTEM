import {connect} from "@/dbconfig/dbConfig"
import User from "@/models/useModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import {sendEmail} from "@/helpers/mailer"

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(typeof(reqBody.username))

        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({
             error: "User already exist"
                
            }, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,
            salt)

            const usersss : String = username

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })   
        
        const savedUser = await newUser.save() 

        console.log("Saved user:", savedUser);




        // user verificatrion
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User registered successfulyyyy",
            success: true,
            savedUser
        })



    } catch (error: any) {
        
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    

}