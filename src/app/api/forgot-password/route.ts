import { NextResponse, NextRequest } from "next/server";
import User from "../../../models/users"
import Connection from "../../../config/conn"
import nodemailer from "nodemailer";
import dotenv from "dotenv";

Connection();
dotenv.config();

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { email } = req;

        const selectUser = await User.find({ email: email });

        if(!email) {
            return NextResponse.json({ message: "Email is required" });
        }
        else if(!selectUser) {
            return NextResponse.json({ message: "Email does'nt exist" });
        }
        else {
            const otp = Math.floor(Math.random() * 1000000);
            const updateUser = await User.findOneAndUpdate({ verification_code: otp });
            const { firstName, lastName } = updateUser;
            const transporter = nodemailer.createTransport({
                host: "smtp.zoho.com",
                port: 465,
                secure: true,
                auth: {
                  user: process.env.MAIL_USERNAME,
                  pass: process.env.MAIL_PASSWORD,
                },
            });
            async function main() {
                const info = await transporter.sendMail({
                    from: process.env.MAIL_USERNAME,
                    to: email,
                    subject: "Password Reset OTP Verification",
                    text: "Thank you for using our services! To reset the password of your account, we require you to verify your identity with a one-time password (OTP).<br>",
                    html: `
                    Dear ${firstName} ${lastName},
                    <br>
                    <p>Please enter this OTP on the <a href="#">verification page</a> to complete the process. Note that this OTP is valid for a limited time period.</p>
                    <br>
                    Your OTP: ${otp}
                    <br>
                    If you did not request a password reset, please ignore this email.
                    <br>
                    Thank you for using our service.
                    `
                });
            }
            main();
            return NextResponse.json({ message: "Mail sent to your email address" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something Went Wrong. Please try again later!" });
    }
}