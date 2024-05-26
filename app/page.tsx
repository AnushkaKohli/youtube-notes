import React from 'react';
import axios from 'axios';
import AllVideos from '@/components/AllVideos';

export const getInitialProps = (async () => {
  const response = await await axios.get('/api/video');
  const thumbnails: string[] = [];
  response.data.map(async (video: any) => {
    const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video.videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY}`);
    thumbnails.push(res.data.items[0].snippet.thumbnails.medium.url);
  })
  console.log("Thumbnails", thumbnails)
  return { thumbnails }
})

export default function Home ({
  thumbnails,
}: { thumbnails: string[] }) {
  return (
    <div>
      Homepage
      <AllVideos />
      {/* <AllVideos thumbnails={thumbnails} /> */}
    </div>
  );
}
