import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/users";
import Connection from "../../../config/conn";

Connection();

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { otp } = req;

        const selectOtp = await User.findOne({ verification_code: otp });

        if(!otp) {
            return NextResponse.json({ message: "OTP is required" });
        }
        else if(!selectOtp) {
            return NextResponse.json({ message: "Invalid OTP" });
        }
        else {
            const updateUser = await User.findOneAndUpdate({ isVerified: true });
            return NextResponse.json({ message: "OTP Verified Successfully" });
        }
    } catch (error) {
        console.log(error);
    }
}