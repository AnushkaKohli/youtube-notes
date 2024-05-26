"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Loading from './Loading';

interface AllVideosProps {
    thumbnails: string[];
}

const AllVideos = () => {
    const [videos, setVideos] = useState<string[]>([]);
    const [thumbnails, setThumbnails] = useState<string[]>([]);
    useEffect(() => {
        getAllVideos();
    }, [])
    const getAllVideos = async () => {
        try {
            const response = await axios.get('/api/video');
            response.data.map(async (video: any) => {
                setVideos((prev) => prev.concat(video.videoId));
                const thumbnail = await getThumbnails(video.videoId);
                setThumbnails((prev) => prev.concat(thumbnail));
            })
        } catch (error) {
            console.log("Error in getting videos", error)
        }
    }
    const videoId = ['Zb94aPnYV7A']
    const getThumbnails = async (videoId: string) => {
        try {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY}`)
            const thumbnail = response.data.items[0].snippet.thumbnails.default.url;
            return thumbnail;
        } catch (error) {
            console.log("Error in getting thumbnail", error)
        }
    }
    const updatedVideoId = videoId[0].split('?')
    if (thumbnails.length === 0 || !thumbnails) {
        return (
            <div>
                <button onClick={() => console.log(thumbnails)}>Get Thumbnail</button>
                <Loading />
            </div>
        )
    }
    return (
        <div className='m-4'>
            {/* All notes */}
            <button onClick={() => console.log(thumbnails)}>Get Thumbnail</button>
            <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'>
                {
                    thumbnails.map((thumbnail, index) => {
                        return (
                            <Image key={index} src={thumbnail} alt='thumbnail' width="200" height="200" className='rounded-lg' />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllVideos
