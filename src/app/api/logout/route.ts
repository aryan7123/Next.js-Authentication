import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({ message: "Logout Successful" });
        response.cookies.set("user_token", "", { httpOnly: true });
        return response;
    } catch (error) {
        console.log(error);
    }
}