"use client"

import Image from 'next/image';
import { clientStorage } from '@/utils/storageService';
import { Briefcase, CircleUser, LogOut, Megaphone, Send } from 'lucide-react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

export default function MinLoginNavbar() {
    const handleLogout = () => {
        clientStorage.remove();
        window.location.reload();
    };



    return (
        <div key="loginNavbar" className='fixed left-0 top-0 right-0 items-center w-full px-5 bg-slate-100 text-indigo-600 '>
            <div className="flex justify-between items-center py-4 mx-auto">
                <a href="/" className="shrink-0">
                    <Image src="/logo.svg" alt="Logo" width={58} height={32} loading="lazy" />
                </a>
                <div className="flex items-center gap-5">
                    <a href="/" className="flex items-center gap-1 p-2 rounded-md hover:bg-primary-100"> {/* jobs to be routed */}
                        <Briefcase />
                        <span className="hidden md:inline">Your Ads</span>
                    </a>
                    <a href="/ads" className="flex items-center gap-1 p-2 rounded-md hover:bg-primary-100">
                        <Megaphone />
                        <span className="hidden md:inline">Your Ads</span>
                    </a>
                    <a href="/inbox" className="flex items-center gap-1 p-2 rounded-md hover:bg-primary-100">
                        <Send />
                        <span className="hidden md:inline">Inbox</span>
                    </a>
                    <a href="/account" className="flex items-center gap-1 p-2 rounded-md hover:bg-primary-100">
                        <CircleUser />
                        <span className="hidden md:inline">Account</span>
                    </a>
                    <a href="/login" className="flex items-center gap-1 p-2 rounded-md hover:bg-primary-100" onClick={handleLogout}>
                        <LogOut />
                        <span className="hidden md:inline">Log out</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
