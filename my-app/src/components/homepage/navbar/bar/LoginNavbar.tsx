"use client"

import Image from 'next/image';
import { clientStorage } from '@/utils/storageService';
import { Briefcase, CircleUser, LogOut, Megaphone, Send } from 'lucide-react';

export default function LoginNavbar() {

    const handleLogout = () => {
        clientStorage.remove();
        window.location.reload();
    };

    return (
        <div key="loginNavbar" className='fixed left-0 top-0 right-0 justify-center items-center w-full px-16 bg-slate-100 text-indigo-600 md:px-5 md:max-w-full'>
            <div className="flex justify-center items-center px-16 py-4 max-md:max-w-full">
                <div className="flex gap-5 justify-between w-full max-w-[1328px] max-md:flex-wrap">
                    <div className="flex gap-5 items-center md:flex-wrap my-auto">
                        <a href="/">
                            <Image src="/logo.svg" alt="Logo" width={58} height={32} loading="lazy" className="shrink-0 my-auto aspect-[1.82] w-[58px]" />
                        </a>
                        <div className="flex flex-auto gap-4">
                            <a href="/" className="flex gap-1 justify-center p-2 whitespace-nowrap rounded-md hover:bg-primary-100"> {/* jobs to be routed */}
                                <Briefcase />
                                <div>Your Jobs</div>
                            </a>
                            <a href="/ads" className="flex gap-1 justify-center p-2 whitespace-nowrap rounded-md hover:bg-primary-100">
                                <Megaphone />
                                <div>Your Ads</div>
                            </a>
                            <a href="/inbox" className="flex gap-1 justify-center p-2 whitespace-nowrap rounded-md hover:bg-primary-100">
                                <Send />
                                <div>Inbox</div>
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <a href="/account"className="flex flex-1 gap-1 justify-center p-2 whitespace-nowrap rounded-md hover:bg-primary-100">
                            <CircleUser />
                            <div>Account</div>
                        </a>
                        <a href="/login" className="flex flex-1 gap-1 justify-center p-2 whitespace-nowrap rounded-md hover:bg-primary-100" onClick={handleLogout}>
                            <LogOut />
                            <div>Log out</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}