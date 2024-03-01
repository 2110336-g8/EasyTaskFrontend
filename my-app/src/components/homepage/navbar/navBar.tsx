"use client"

import {
    EnvelopeClosedIcon,
    BackpackIcon,
    Pencil2Icon,
    PersonIcon,
} from '@radix-ui/react-icons';

import { clientStorage } from '@/utils/storageService';
import LoginNavbar from './LoginNavbar';
import LogoutNavbar from './LogoutNavbar';

type LogoutHandler = () => void;

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
