"use client"

import { clientStorage } from '@/utils/storageService';
import LoginNavbar from './LoginNavbar';
import LogoutNavbar from './LogoutNavbar';

export default function NavBar() {
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
