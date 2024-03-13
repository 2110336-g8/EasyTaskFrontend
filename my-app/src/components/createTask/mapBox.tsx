'use client';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import pinIcon from './pin_icon.jpg'; // Import your pin icon image

const Map = ({
    onPinLocation,
}: {
    onPinLocation: (lng: number, lat: number) => void;
}) => {
    const mapContainer = useRef(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const marker = useRef<mapboxgl.Marker | null>(null);

    useEffect(() => {
        mapboxgl.accessToken =
            'pk.eyJ1IjoicHB1dW5uIiwiYSI6ImNsdDcwZ2kwejBoZmcycW05cmV6c3R6Y2IifQ.0knU0TIn7P514S-GW6BBkg';
        if (!mapContainer.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [100.520187, 13.725559],
            zoom: 9,
        });

        map.current.addControl(new mapboxgl.NavigationControl());

        // Add event listener for map clicks
        map.current.on('click', e => {
            const { lng, lat } = e.lngLat;
            console.log(`Clicked at: ${lng}, ${lat}`);

            setLatitude(lat);
            setLongitude(lng);

            // Remove the previous marker if exists
            if (marker.current) {
                marker.current.remove();
            }

            // Create a new marker at the clicked location
            marker.current = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map.current!);
            onPinLocation(lng, lat);
        });

        // Pin the current location by default
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    console.log(`Default location: ${lng}, ${lat}`);

                    setLatitude(lat);
                    setLongitude(lng);

                    // Remove the previous marker if exists
                    if (marker.current) {
                        marker.current.remove();
                    }

                    // Create a new marker at the default location
                    marker.current = new mapboxgl.Marker()
                        .setLngLat([lng, lat])
                        .addTo(map.current!);

                    // Pan the map to the marked location
                    map.current?.setCenter([lng, lat]);

                    // Call onPinLocation directly
                    onPinLocation(lng, lat);
                },
                error => {
                    console.error('Error getting current location:', error);
                },
            );
        }

        return () => {
            map.current?.remove();
        };
    }, []);

    const handlePinCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log(`Current location: ${lng}, ${lat}`);

                setLatitude(lat);
                setLongitude(lng);

                // Remove the previous marker if exists
                if (marker.current) {
                    marker.current.remove();
                }

                // Create a new marker at the current location
                marker.current = new mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .addTo(map.current!);

                // Pan the map to the marked location
                map.current?.setCenter([lng, lat]);

                // Call onPinLocation directly
                onPinLocation(lng, lat);
            },
            error => {
                console.error('Error getting current location:', error);
            },
        );
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <div
                ref={mapContainer}
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            />
            <button
                type='button' // Add this line to specify the button type
                onClick={handlePinCurrentLocation}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1,
                }}
            >
                <img
                    src='/pin_current_loc.jpg'
                    alt='Pin Current Location'
                    style={{ width: '30px', height: '30px' }}
                />
            </button>
        </div>
    );
};

export default Map;
