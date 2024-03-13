"use client"

import { clientStorage } from '@/utils/storageService';
import LoginNavbar from './bar/LoginNavbar';
import LogoutNavbar from './bar/LogoutNavbar';
import { useState, useEffect } from 'react';

export default function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        setIsLoggedIn(!!clientStorage.get().token);
    }, []);

    return (
        <div key="main-navbar">
            {isLoggedIn ? (
                <LoginNavbar />
            ) : (
                <LogoutNavbar />
            )}
        </div>
    );
}
