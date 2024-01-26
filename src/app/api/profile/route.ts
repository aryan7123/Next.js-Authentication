import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "../../../models/users";
import Connection from "../../../config/conn";

Connection();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("user_token")?.value || "";

    const user = jwt.verify(token, "user_token");
    const selectUser = await User.findById(user.id);
    return NextResponse.json({ user: selectUser });
  } 
  catch (error) {
    console.log(error);
  }
}
