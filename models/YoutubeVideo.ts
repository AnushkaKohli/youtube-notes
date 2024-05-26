import mongoose, { Schema, models } from "mongoose";

const youtubeVideoSchema = new Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    channelName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const YoutubeVideo =
  models.YoutubeVideo || mongoose.model("YoutubeVideo", youtubeVideoSchema);
export default YoutubeVideo;
