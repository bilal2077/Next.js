import {connect} from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { verify } from "crypto";
import {NextRequest, NextResponse} from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const user = await User.findOne({verifyToken: token,
            verifyTokenExpiry:{$gt:Date.now()}
        })
        if (!user) {
            return NextResponse.json({error: "Invalid Token"},
                {status:400})
        }
        console.log(user);

        user.isVerified = true
        user.verifyToken =  undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "Email verified successFully",
            success: true
        },
            {status:500})
        
    } catch (error : any) {
        return NextResponse.json({error: error.manage},
             {status:500})
    }
    
}