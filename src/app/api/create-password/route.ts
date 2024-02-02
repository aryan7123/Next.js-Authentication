import { NextRequest, NextResponse } from "next/server";
import User from "@/models/users";
import Connection from "@/config/conn";

Connection();

export async function POST(request: NextRequest) {
    try {
        
    } catch (error) {
        console.error(error);
    }
}