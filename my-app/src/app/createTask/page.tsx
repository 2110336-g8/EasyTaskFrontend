'use client';
import React, { useState } from 'react';
import Map from '@/components/createTask/mapBox';

const ParentComponent = () => {
    const [pinnedLocation, setPinnedLocation] = useState<{
        latitude: number | null;
        longitude: number | null;
    }>({ latitude: null, longitude: null });

    const handlePinLocation = (lng: number, lat: number) => {
        setPinnedLocation({ longitude: lng, latitude: lat });
    };

    return (
        <div>
            <Map onPinLocation={handlePinLocation} />
            {pinnedLocation.latitude !== null &&
                pinnedLocation.longitude !== null && (
                    <div>
                        <p>Pinned Location:</p>
                        <p>Latitude: {pinnedLocation.latitude}</p>
                        <p>Longitude: {pinnedLocation.longitude}</p>
                    </div>
                )}
        </div>
    );
};

export default ParentComponent;
