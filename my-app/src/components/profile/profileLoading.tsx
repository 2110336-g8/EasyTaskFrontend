import React, { useEffect, useState } from 'react';

const loadingMessages = [
    'Loading...',
    'Please wait...',
    'Fetching data...',
    'Hold on a moment...',
    'Getting things ready...',
    'Loading your profile...',
    'Almost there...',
    'Hang tight...',
    'One moment please...',
];

export default function ProfileLoading() {
    const [randomMessage, setRandomMessage] = useState('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * loadingMessages.length);
        const randomMsg = loadingMessages[randomIndex];
        setRandomMessage(randomMsg);
    }, []);

    return (
        <div className="flex justify-center items-center h-screen gap-4">
            <p className="italic text-base text-gray-500">
                {randomMessage}
            </p>
        </div>
    );
};
