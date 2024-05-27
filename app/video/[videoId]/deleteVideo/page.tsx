import DeleteVideo from '@/components/DeleteVideo'
import React from 'react'

const page = ({ params }: { params: { videoId: string } }) => {
    return (
        <DeleteVideo videoId={params.videoId} />
    )
}

export default page
