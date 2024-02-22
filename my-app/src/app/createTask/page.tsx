'use client';
import React, { useState } from 'react';
import MapComponent from '@/components/google/map';

const CreateTask = () => {
    const [position, setPosition] = useState({ lat: 0, lng: 0 });

    const handlePositionChange = (newPosition: {
        lat: number;
        lng: number;
    }) => {
        setPosition(newPosition);
    };

    return (
        <div>
            <MapComponent onPositionChange={handlePositionChange} />
            <p>Latitude: {position.lat}</p>
            <p>Longitude: {position.lng}</p>
        </div>
    );
};

export default CreateTask;
