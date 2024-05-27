"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import YouTube, { YouTubeProps } from 'react-youtube';
import axios from 'axios';
import VideoTitle from './VideoTitle';
import Notes from './Notes';
import { convertSecondsToTimeString } from '@/utils/conversion';
import Button from './Button';

interface VideoPlayerProps {
    videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
    const [timestamp, setTimestamp] = useState<string | number | undefined>(0);
    const [player, setPlayer] = useState<any>(null);
    const [title, setTitle] = useState<string>('');
    const [channelName, setChannelName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY}`)
            const result = response.data.items[0].snippet;
            setTitle(result.title);
            setChannelName(result.channelTitle);
            setDescription(result.description);
            return result;
        } catch (error) {
            console.log("Error in getting details from youtube API", error)
        }
    }

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        setPlayer(event.target);
        console.log('Player is ready');
    };

    const opts: YouTubeProps['opts'] = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const onPlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
        console.log('Player state is:', event.data);
        setTimestamp(getCurrentTime());
        console.log('Timestamp:', timestamp);
    };

    const getCurrentTime = () => {
        if (player) {
            const currentTime = player.getCurrentTime();
            const formattedTime = convertSecondsToTimeString(currentTime);
            return formattedTime;
        } else {
            console.log('Player not ready yet');
        }
    };

    return (
        <div className="p-4 flex flex-col justify-center mt-16 md:-mt-4">
            <div className='flex w-full justify-between'>
                <h1 className=" font-semibold text-xl pb-4">
                    {channelName}
                </h1>
                <Link href={`/video/${videoId}/deleteVideo`}>
                    <button type="button" className="text-white bg-red-600 border hover:bg-red-500 font-medium rounded-lg text-sm px-4 py-2.5 mb-4">
                        Delete Video
                    </button>
                </Link>
            </div>
            <div className="video-player">
                <YouTube
                    videoId={videoId}
                    iframeClassName='rounded-md w-full h-[70vh]'
                    opts={opts}
                    onReady={onPlayerReady}
                    onStateChange={onPlayerStateChange}
                    onPause={onPlayerStateChange}
                />

                <VideoTitle title={title} description={description} />
                <div className="border border-gray-200 rounded-xl p-6">
                    <Notes timestamp={timestamp as string} setTimestamp={setTimestamp as React.Dispatch<React.SetStateAction<string>>} videoId={videoId} player={player} />
                </div>
            </div>
        </div>

    );
};

export default VideoPlayer;
