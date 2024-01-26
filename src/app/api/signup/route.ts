import User from "../../../models/users"
import Connection from "../../../config/conn"
import { NextRequest, NextResponse } from "next/server";

Connection();

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
            const newUser = new User({
                firstName,
                lastName,
                email,
                mobile,
                password,
                verification_code: "",
                reset_password_token: "",
                isVerified: false
            });

            const saveUser = await newUser.save();
            return NextResponse.json({ message: "You have registered successfully", user: saveUser });
        }
    } 
    catch (error) {
        console.error(error);
    }
}