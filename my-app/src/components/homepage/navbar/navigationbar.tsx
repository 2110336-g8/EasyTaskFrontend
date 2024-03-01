"use client"

import { clientStorage } from '@/utils/storageService';
import LoginNavbar from './bar/LoginNavbar';
import LogoutNavbar from './bar/LogoutNavbar';

export default function Navbar() {
    const isLoggedIn = !!clientStorage.get().token;

    console.log(isLoggedIn);

    return (
        <div>
            {!isLoggedIn ? (
                <LoginNavbar />
            ) : (
                <LogoutNavbar />
            )}
        </div>
    );
}
