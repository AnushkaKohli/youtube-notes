"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Loading from './Loading';
import Link from 'next/link';
import Button from './Button';

const AllVideos = () => {
    const [thumbnails, setThumbnails] = useState<string[]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const [channelNames, setChannelNames] = useState<string[]>([]);
    const [videoIds, setVideoIds] = useState<string[]>([]);
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
                setVideoIds((prev) => {
                    if (!prev.includes(video.videoId)) {
                        return prev.concat(video.videoId);
                    } else {
                        return prev;
                    }
                })
                const result = await getResult(video.videoId);
                setThumbnails((prev) => {
                    if (!prev.includes(result.thumbnails.maxres.url)) {
                        return prev.concat(result.thumbnails.maxres.url);
                    } else {
                        return prev;
                    }
                });
                setTitles((prev) => {
                    if (!prev.includes(result.title)) {
                        return prev.concat(result.title);
                    } else {
                        return prev;
                    }
                });
                setChannelNames((prev) => {
                    if (!prev.includes(result.channelTitle)) {
                        return prev.concat(result.channelTitle);
                    } else {
                        return prev;
                    }
                });
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

    if (thumbnails.length === 0 || !thumbnails) {
        return (
            <div className='flex flex-col gap-y-8 items-center justify-center h-full w-full absolute'>
                <h1 className='text-3xl font-bold self-center'>No videos to show. Add new videos!</h1>
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
                    thumbnails.map((thumbnail, index) => {
                        return (
                            <Link key={index} href={`/video/${videoIds[index]}`} passHref>
                                <div className='flex flex-col'>
                                    <Image src={thumbnail} alt='thumbnail' width="600" height="500" className='rounded-lg self-center' />
                                    <div className='font-semibold text-base 3xl:text-2xl my-1.5 overflow-hidden'>
                                        <h1>
                                            {
                                                // setTruncateString(titles[index])
                                                truncateString(titles[index], 90)
                                            }
                                        </h1>
                                    </div>
                                    <p className='font-semibold text-sm 3xl:text-xl text-[#555] my-1.5'>{channelNames[index]}</p>
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
