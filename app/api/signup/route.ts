import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/utils/mongodb";
import User from "@/models/User";

export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    try {
      await user.save();
      return new NextResponse("User created successfully", { status: 201 });
    } catch (error) {
      return new NextResponse(`Error in saving user: ${error}`, {
        status: 500,
      });
    }
  } catch (error) {
    return new NextResponse(`Error in signup: ${error}`, { status: 500 });
  }
};
