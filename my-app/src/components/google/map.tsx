// MapComponent.js
import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapComponent = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    });

    const mapStyles = {
        height: '400px',
        width: '100%',
    };
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setCurrentPosition({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            });
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setCurrentPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return isLoaded ? (
        <>
            <button onClick={getCurrentLocation}>Get Current Location</button>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={10}
                center={currentPosition}
                onClick={handleMapClick}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </>
    ) : (
        <></>
    );
};

export default MapComponent;
