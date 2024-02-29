'use client';
import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MarkerType {
    latitude: number;
    longitude: number;
}

const Map = () => {
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    });
    const [markers, setMarkers] = useState<MarkerType[]>([]);

    const handlePinCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            setViewport({
                ...viewport,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 12,
            });
        });
    };

    const handleMapClick = (event: any) => {
        if (event.lngLat) {
            const newMarker: MarkerType = {
                latitude: event.lngLat[1],
                longitude: event.lngLat[0],
            };
            setMarkers([...markers, newMarker]);
        }
    };

    return (
        <div style={{ height: '400px' }}>
            <ReactMapGL
                {...viewport}
                width='100%'
                height='100%'
                mapStyle='mapbox://styles/mapbox/streets-v11'
                mapboxAccessToken='pk.eyJ1IjoicHB1dW5uIiwiYSI6ImNsdDZ5bzNnaDBod3Iycm5uajBvOXY1MGcifQ.9WIcoAq3LtJcMP782gn89w'
                onViewportChange={(
                    newViewport: React.SetStateAction<{
                        latitude: number;
                        longitude: number;
                        zoom: number;
                    }>,
                ) => setViewport(newViewport)}
                onClick={handleMapClick}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <div>📍</div>
                    </Marker>
                ))}
            </ReactMapGL>
            <button onClick={handlePinCurrentLocation}>
                Pin Current Location
            </button>
        </div>
    );
};

export default Map;
