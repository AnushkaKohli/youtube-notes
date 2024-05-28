"use client";

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Button from './Button'

interface DeleteVideoProps {
    videoId: string
}

const DeleteVideo = ({ videoId }: DeleteVideoProps) => {
    const router = useRouter();
    const deleteVideo = async (videoId: string) => {
        try {
            const config = {
                method: 'delete',
                url: `/api/video`,
                data: { videoId }
            }
            await axios.request(config);
            router.push('/');
        } catch (error) {
            console.log("Error in deleting video", error)
        }
    }
    return (
        <div className='flex flex-col gap-y-8 items-center justify-center h-full max-w-full absolute mx-8'>
            <h1 className='text-3xl font-bold text-center'>Are you sure you want to delete the video?</h1>
            <div className='flex items-center justify-between gap-x-6'>
                <button type="button" onClick={() => deleteVideo(videoId)} className="text-white bg-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-800 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 flex items-center gap-x-2">
                    Yes
                </button>
                <Link href={`/video/${videoId}`}>
                    <Button text='No' />
                </Link>
            </div>
        </div>
    )
}

export default DeleteVideo
