import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/utils/mongodb";
import YoutubeVideo from "@/models/YoutubeVideo";

export const POST = async (request: NextRequest) => {
  try {
    const { videoId } = await request.json();
    if (!videoId) {
      return new NextResponse("Video ID is required", { status: 400 });
    }
    await connectMongoDB();
    const existingVideo = await YoutubeVideo.findOne({ videoId });
    if (existingVideo) {
      return new NextResponse("Video already exists");
    }
    const video = new YoutubeVideo({ videoId });
    try {
      await video.save();
      return new NextResponse("Video added successfully", { status: 201 });
    } catch (error) {
      console.log("Error in saving video", error);
      return new NextResponse("Error in saving video", { status: 500 });
    }
  } catch (error) {
    console.log("Error in adding video", error);
    return new NextResponse("Error in adding video", { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    await connectMongoDB();
    const videos = await YoutubeVideo.find();
    return new NextResponse(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    console.log("Error in getting videos", error);
    return new NextResponse("Error in getting videos", { status: 500 });
  }
};
