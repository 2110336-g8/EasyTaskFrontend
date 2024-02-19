'use client';
import React, { useState } from 'react';
import MapComponent from '@/components/google/map';

const Home = () => {
    return (
        <div>
            <h1>My Next.js App with Google Maps</h1>
            <MapComponent />
        </div>
    );
};

export default Home;
