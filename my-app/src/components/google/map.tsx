// MapComponent.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface MapComponentProps {
    onPositionChange: (position: { lat: number; lng: number }) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onPositionChange }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    });

    const mapStyles: React.CSSProperties = {
        // Adjust the type to React.CSSProperties
        height: '400px',
        width: '100%',
        position: 'relative', // Ensure relative positioning for the map container
    };
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        onPositionChange(currentPosition);
    }, [currentPosition, onPositionChange]);

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
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={currentPosition}
            onClick={handleMapClick}
        >
            {/* Custom control for "Get Current Location" button */}
            <div
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1,
                    width: '32px', // Adjust the width to match zoom in/out button
                    height: '32px', // Adjust the height to match zoom in/out button
                }}
            >
                <button
                    onClick={getCurrentLocation}
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: 0,
                        border: 'none',
                        background: 'none',
                    }}
                >
                    <img
                        src='/pin_current_loc.jpg'
                        alt='Get Current Location'
                        style={{ width: '100%', height: '100%' }}
                    />
                </button>
            </div>

            {/* Marker for current position */}
            <Marker position={currentPosition} />
        </GoogleMap>
    ) : (
        <></>
    );
};

export default MapComponent;
