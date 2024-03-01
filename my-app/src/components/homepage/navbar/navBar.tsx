"use client"

import { clientStorage } from '@/utils/storageService';
import LoginNavbar from './bar/LoginNavbar';
import LogoutNavbar from './bar/LogoutNavbar';

export default function xNavbar() {
    const isLoggedIn = !!clientStorage.get().token;

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
