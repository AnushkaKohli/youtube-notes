"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Loading from './Loading';

interface AllVideosProps {
    thumbnails: string[];
}

const AllVideos = () => {
    const [thumbnails, setThumbnails] = useState<string[]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const [channelNames, setChannelNames] = useState<string[]>([]);;

    useEffect(() => {
        fetchData();
    }, [])

    const getResult = async (videoId: string) => {
        try {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY}`)
            const result = response.data.items[0].snippet;
            return result;
        } catch (error) {
            console.log("Error in getting details from youtube API", error)
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/video');
            response.data.map(async (video: any) => {
                const result = await getResult(video.videoId);
                setThumbnails((prev) => prev.concat(result.thumbnails.maxres.url));
                setTitles((prev) => prev.concat(result.title));
                setChannelNames((prev) => prev.concat(result.channelTitle));
            })
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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-x-8 gap-y-8 mt-4 p-10 md:p-5'>
                {
                    thumbnails.map((thumbnail, index) => {
                        return (
                            <div className='flex flex-col' key={index}>
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
                        )
                    })
                }
                <div className='flex justify-center flex-col'>
                    <Image src='https://i.ytimg.com/vi/HZuk6Wkx_Eg/maxresdefault.jpg' alt='thumbnail' width="600" height="500" className='rounded-lg self-center' />
                    <div className='font-semibold text-base 3xl:text-2xl my-1.5 overflow-hidden'>
                        <h1>
                            {
                                truncateString('lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 90)
                            }
                        </h1>
                    </div>
                    <p className='font-semibold text-sm 3xl:text-xl text-[#555] my-1.5'>dshfjksd</p>
                </div>
            </div>
        </div>
    )
}

export default AllVideos
