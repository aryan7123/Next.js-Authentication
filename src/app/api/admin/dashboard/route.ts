import { NextRequest, NextResponse } from "next/server"
import User from "@/models/users"
import Admin from "@/models/admin"
import Connection from "@/config/conn"
import jwt from "jsonwebtoken";

Connection();

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value || "";
        const decodeToken = jwt.verify(token, "admin_token");
        const adminId = decodeToken._id;
        
        const selectAdmin = await Admin.findById(adminId);
        return NextResponse.json({ admin: selectAdmin });

    } catch (error) {
        console.error(error);
    }
}