import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/users";
import Connection from "../../../config/conn";

Connection();

export async function name(request: NextRequest) {
    try {
        const req = await request.json();
        const { password, confirmPassword } = req;

        if(!password || !confirmPassword) {
            return NextResponse.json({ message: "All the fields are required" });
        }
        else if() {

        }
    } catch (error) {
        console.error(error);
    }
}