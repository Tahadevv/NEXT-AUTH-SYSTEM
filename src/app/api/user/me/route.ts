import {connect} from "@/dbconfig/dbConfig"
import User from "@/models/useModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import {sendEmail} from "@/helpers/mailer"
import jwt from 'jsonwebtoken'
import { getDataFromToken } from "@/helpers/getDataFromToken"


connect()

export async function POST(request: NextRequest) {

    try{
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")

    return NextResponse.json({
        message: "User found",
        data: user
    })
} catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 400});
}
}