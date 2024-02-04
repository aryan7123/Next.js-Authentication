import { NextRequest, NextResponse } from "next/server";
import User from "@/models/users";
import Connection from "@/config/conn";

Connection();

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { password, confirmPassword, resetId } = req;

        const selectResetId = await User.findOne({ reset_password_token: resetId });

        if(!password || !confirmPassword) {
            return NextResponse.json({ message: "The above fields are required" });
        }
        else if(!resetId || !selectResetId) {
            return NextResponse.json({ message: "The reset id is invalid" });
        }
        else if(password !== confirmPassword) {
            return NextResponse.json({ message: "Password does'nt match" });
        }
        else {
            const updatePassword = await User.findOneAndUpdate(
                {
                    password: password,
                    reset_password_token: ""
                }
            );
            return NextResponse.json({ message: "Password updated successfully", user: updatePassword });
        }

    } catch (error) {
        console.error(error);
    }
}