import User from "../../../models/users"
import Connection from "../../../config/conn"
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

Connection();

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { email, password } = req;

        const selectUser = await User.findOne({ email: email, password: password });

        if(!email || !password) {
            return NextResponse.json({ message: "All the fields are required" });
        }
        else if(!selectUser) {
            return NextResponse.json({ message: "Wrong Credentials" });
        }
        else {
            const userToken = {
                id: selectUser._id
            }
            const token = jwt.sign(userToken, "user_token");
            
            const response = NextResponse.json({ message: "You have logged in successfully" });
            response.cookies.set("user_token", token, { httpOnly: true });
            return response;
        }
    }
    catch (error) {
        console.error(error);
    }
}