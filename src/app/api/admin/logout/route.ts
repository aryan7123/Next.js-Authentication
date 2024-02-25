import { NextRequest, NextResponse } from "next/server";
import Connection from "@/config/conn";

Connection();

export async function GET() {
    try {
        const response = NextResponse.json({ message: "Logout Successful" });
        response.cookies.set("admin_token", "", { httpOnly: true });
        return response;
    } catch (error) {
        console.error(error);
    }
}