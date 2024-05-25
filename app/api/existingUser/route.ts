import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/utils/mongodb";
import User from "@/models/User";

export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    await connectMongoDB();
    const existingUser = await User.findOne({ email }).select("_id");
    if (!existingUser) {
      return new NextResponse("User not found");
    }
    return new NextResponse(existingUser, { status: 200 });
  } catch (error) {
    console.log("Error in finding existing user: ", error);
    return new NextResponse(`Error in finding existing user: ${error}`, {
      status: 500,
    });
  }
};
