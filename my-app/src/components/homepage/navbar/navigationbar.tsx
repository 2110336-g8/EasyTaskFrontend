"use client"

import { clientStorage } from '@/utils/storageService';
import LoginNavbar from './bar/LoginNavbar';
import LogoutNavbar from './bar/LogoutNavbar';
import { useState, useEffect } from 'react';

export default function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(!!clientStorage.get().token);

    useEffect(() => {
        setIsLoggedIn(!!clientStorage.get().token);
    }, []);

    // console.log(isLoggedIn);

    return (
        <div>
            {isLoggedIn ? (
                <LoginNavbar />
            ) : (
                <LogoutNavbar />
            )}
        </div>
    );
}
