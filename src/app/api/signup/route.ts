import User from "../../../models/users"
import Connection from "../../../config/conn"
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

Connection();
dotenv.config();

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { firstName, lastName, email, mobile, password, confirmPassword } = req;

        if(!firstName || !lastName || !email || !mobile || !password || !confirmPassword) {
            return NextResponse.json({ message: "All the fields are required" });
        }
        else if(await User.findOne({ email: email })) {
            return NextResponse.json({ message: "Email Already exists" });
        }
        else if(await User.findOne({ mobile: mobile })) {
            return NextResponse.json({ message: "Mobile Number Already exists" });
        }
        else if(password !== confirmPassword) {
            return NextResponse.json({ message: "Password does'nt match" });
        }
        else {
            const otp = Math.floor(Math.random() * 1000000);
            const newUser = new User({
                firstName,
                lastName,
                email,
                mobile,
                password,
                verification_code: otp,
                reset_password_token: "",
                isVerified: false
            });

            const saveUser = await newUser.save();
            if(saveUser) {
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
                        subject: "Email Verification",
                        text: "Thank you for using our services! For the verification of your account, we require you to verify your identity with a one-time password (OTP).<br>",
                        html: `
                        Dear ${firstName} ${lastName},
                        <br><br>
                        Note that is OTP will be valid only for a limited period of time
                        <br><br>
                        Your Verification OTP: ${otp}
                        <br><br>
                        If you did not request a verification, please ignore this email.
                        <br><br>
                        Thank you for using our service.
                        `
                    });
                }
                main();
                return NextResponse.json({ message: "You have registered successfully" });
            }
        }
    } 
    catch (error) {
        console.error(error);
    }
}