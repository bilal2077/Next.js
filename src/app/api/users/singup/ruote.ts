import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";
import { log } from 'console';
import {NextRequest,NextResponse} from 'next/server';
import {sendMail} from '@/helpers/mailer';

connect();

export async function POST(Request: NextRequest){
    try {
        const reqBody = await Request.json();
        const {username, email, password} = reqBody
        
        console.log(reqBody);
        const user =await User.findOne({email})        
        
        if(user){
            return NextResponse.json({message: 'User already exists'},
            {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);


        // send verification email
        await sendMail({email, emailType: 'verify', userId: savedUser._id});

        return NextResponse.json({message: 'User created successfully',
            success: true,
            savedUser
        });
        

    } 
    catch (error:any) {
        return NextResponse.json({error: error.message},
            {status: 500});
            
        }
    }
