"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Loading from './Loading';
import Link from 'next/link';

const AllVideos = () => {
    const [data, setData] = useState<any[]>([]); // [title, channelName, thumbnail, videoId]
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, [])

    const getResult = async (videoId: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY}`)
            const result = response.data.items[0].snippet;
            setLoading(false);
            return result;
        } catch (error) {
            console.log("Error in getting details from youtube API", error)
        }
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/video');
            response.data.map(async (video: any) => {
                const result = await getResult(video.videoId);
                setData((prev) => {
                    const existingIndex = prev.findIndex(item => item.videoId === video.videoId);
                    if (existingIndex === -1) {
                        // videoId not found in prev array, so concatenate
                        return prev.concat({
                            "title": result.title,
                            "channelName": result.channelTitle,
                            "thumbnail": result.thumbnails.maxres.url,
                            "videoId": video.videoId
                        });
                    } else {
                        // videoId already exists in prev array, so return prev array as is
                        return prev;
                    }
                })
            })
            setLoading(false);
        } catch (error) {
            console.log("Error in getting videos", error)
        }
    }

    const truncateString = (str: string, num: number) => {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num) + '...'
    }

    // const setTruncateString = (str: string) => {
    //     const widths = [0, 768, 1024, 1280, 1536, 2000];
    //     let resultantString = '';
    //     if (window.innerWidth >= widths[0] && window.innerWidth < widths[1]) {
    //         resultantString = truncateString(str, 120)
    //     } else if (window.innerWidth >= widths[1] && window.innerWidth < widths[2]) {
    //         resultantString = truncateString(str, 80)
    //     } else if (window.innerWidth >= widths[2] && window.innerWidth < widths[3]) {
    //         resultantString = truncateString(str, 65)
    //     } else if (window.innerWidth >= widths[3] && window.innerWidth < widths[4]) {
    //         resultantString = truncateString(str, 56)
    //     } else if (window.innerWidth >= widths[4] && window.innerWidth < widths[5]) {
    //         resultantString = truncateString(str, 140)
    //     } else {
    //         resultantString = truncateString(str, 70)
    //     }
    //     return resultantString;
    // }

    if (loading) {
        return (
            <Loading />
        )
    }

    if (data.length === 0 || !data) {
        return (
            <div className='flex flex-col gap-y-8 items-center justify-center h-full max-w-full md:w-full absolute mx-8'>
                <h1 className='text-3xl font-bold text-center'>No videos to show. Add new videos!</h1>
                <Link href='/video/addVideo'>
                    <button type="button" className="text-white bg-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-800 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 flex items-center gap-x-2">
                        Add new video
                    </button>
                </Link>
            </div>
        )
    }
    return (
        <div className='m-4'>
            {/* All notes */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-x-8 gap-y-8 mt-4 p-10 md:p-5'>
                {
                    data.map((data, index) => {
                        return (
                            <Link key={index} href={`/video/${data.videoId}`} passHref>
                                <div className='flex flex-col'>
                                    <Image src={data.thumbnail} alt='thumbnail' width="600" height="500" className='rounded-lg self-center' />
                                    <div className='font-semibold text-base 3xl:text-2xl my-1.5 overflow-hidden'>
                                        <h1>
                                            {
                                                // setTruncateString(titles[index])
                                                truncateString(data.title, 90)
                                            }
                                        </h1>
                                    </div>
                                    <p className='font-semibold text-sm 3xl:text-xl text-[#555] my-1.5'>{data.channelName}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllVideos
