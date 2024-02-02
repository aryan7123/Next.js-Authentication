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

        const selectUser = await User.findOne({ email: email });

        if(!email) {
            return NextResponse.json({ message: "Email is required" });
        }
        else if(!selectUser) {
            return NextResponse.json({ message: "Email does'nt exist" });
        }
        else {
            function generateToken(length: any) {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let token = '';
                for (let i = 0; i < length; i++) {
                    token += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return token;
            }

            const token = generateToken(40);
            const updateToken = await User.updateOne({ reset_password_token: token });
            const link = `http://localhost:3000/create-password?token=${token}`;
            const transporter = nodemailer.createTransport({
                host: "smtp.zoho.com",
                port: 465,
                secure: true,
                auth: {
                  user: process.env.MAIL_USERNAME,
                  pass: process.env.MAIL_PASSWORD
                }
            });
            async function main() {
                const info = await transporter.sendMail({
                    from: process.env.MAIL_USERNAME,
                    to: email,
                    subject: "Reset Your Password",
                    text: "Thank you for using our services! To reset the password of your account you will be directed to the create password page",
                    html: `
                    <p>Hello ${selectUser.firstName} ${selectUser.lastName}</p>
                    <p>We received a request to reset your password for your account. If you did not make this request, please ignore this email.</p>
                    <p>To set a new password, please click on the button below:</p>
                    <a href=${link}>Reset Password</a>
                    <p>This link will expire in 24 hours for security reasons. If you need help, please contact our support team.</p>
                    <p>Thank you</p>
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