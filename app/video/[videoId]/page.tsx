import VideoPlayer from '@/components/VideoPlayer'
import React from 'react'

const page = ({ params }: { params: { videoId: string } }) => {
  return (
    <VideoPlayer videoId={params.videoId} />
  )
}

export default page
