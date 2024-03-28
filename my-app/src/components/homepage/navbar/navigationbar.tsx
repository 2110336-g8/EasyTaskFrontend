'use client';

import { clientStorage } from '@/utils/storageService';
import LoginNavbar from './bar/LoginNavbar';
import LogoutNavbar from './bar/LogoutNavbar';
import EmptyNavbar from './bar/EmptyNavbar';
import { useState, useEffect } from 'react';


export default function Navbar() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = clientStorage.get().token;
        setIsLoggedIn(!!token);
        setIsLoading(false); 
    }, []);

    return (
        <div id='main-navbar'>
            {isLoading ? (
                <EmptyNavbar />
            ) : (
                isLoggedIn ? <LoginNavbar /> : <LogoutNavbar />
            )}
        </div>
    );
}
