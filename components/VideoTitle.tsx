import React from 'react';

interface VideoTitleProps {
    title: string;
    description: string;
}

const VideoTitle: React.FC<VideoTitleProps> = ({ title, description }) => {
    return (
        <div className="video-player pt-6">
            <h1 className='font-semibold'>{title}</h1>
            <p className='text-gray-400 text-sm'>{description}</p>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
    );
};

export default VideoTitle;
