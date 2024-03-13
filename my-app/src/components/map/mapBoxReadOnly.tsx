'use client';
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapReadOnly = ({
    coord,
}: {
    coord: {
        lat?: number;
        lng?: number;
    };
}) => {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const marker = useRef<mapboxgl.Marker | null>(null);
    const default_coord: [number, number] = [100.520187, 13.725559]; // LNG, LAT

    useEffect(() => {
        mapboxgl.accessToken =
            'pk.eyJ1IjoicHB1dW5uIiwiYSI6ImNsdDcwZ2kwejBoZmcycW05cmV6c3R6Y2IifQ.0knU0TIn7P514S-GW6BBkg';
        if (!mapContainer.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: default_coord,
            zoom: 10,
            // interactive: false,
        });

        if (marker.current) {
            marker.current.remove();
        }

        marker.current = new mapboxgl.Marker()
            .setLngLat([
                coord.lng || default_coord[0],
                coord.lat || default_coord[1],
            ])
            .addTo(map.current!);

        map.current?.setCenter([
            coord.lng || default_coord[0],
            coord.lat || default_coord[1],
        ]);

        return () => {
            map.current?.remove();
        };
    }, []);

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
                type='button'
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

export default MapReadOnly;
