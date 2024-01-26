import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/users";
import Connection from "../../../config/conn";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

Connection();
dotenv.config();

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { otp } = req;

        const selectOtp = await User.findOne({ verification_otp: otp });

        if(!otp) {
            return NextResponse.json({ message: "OTP is required" });
        }
        else if(!selectOtp) {
            return NextResponse.json({ message: "Invalid OTP" });
        }
        else {
            
        }

    } catch (error) {
        console.log(error);
    }
}