"use client"

import Image from 'next/image';
import { clientStorage } from '@/utils/storageService';

export default function LoginNavbar() {

    const handleLogout = () => {
        clientStorage.remove();
        window.location.reload();
    };

    return (
        <div key="loginNavbar" className='fixed left-0 top-0 right-0 bg-slate-100 w-full h-[72px] z-50 flex items-center justify-center gap-8'>
            <div className='p-2 w-full desktop:w-[1200px] desktop-l:w-[1328px] flex items-center justify-between'>
                <div className="flex items-center gap-4">
                    <a href="/" className="relative flex-shrink-0">
                        <Image src="/logo.svg" alt="Logo" width={58} height={32} className="brightness-normal transition duration-300" />
                        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-25 transition duration-250"></div>
                    </a>
                    <ul className='flex items-center space-x-4'>
                        <li className="inline-flex items-end gap-4">
                            <a className="flex items-end gap-1" href="/">
                                <Image src="/navicons/briefcase.svg" alt="job icon" width={32} height={32} className="brightness-normal transition duration-300"/>
                                <span className="text-primary-500 font-inter font-semibold text-base leading-6 tracking-tighter">Your Jobs</span>
                            </a>
                        </li>
                        <li className="inline-flex items-end gap-4">
                            <a className="flex items-end gap-1" href="/">
                                <Image src="/navicons/megaphone.svg" alt="ads icon" width={32} height={32} className="brightness-normal transition duration-300"/>
                                <span className="text-primary-500 font-inter font-semibold text-base leading-6 tracking-tighter">Your Ads</span>
                            </a>
                        </li>
                        <li className="inline-flex items-end gap-4">
                            <a className="flex items-end gap-1" href="/inbox">
                                <Image src="/navicons/send.svg" alt="inbox icon" width={32} height={32} className="brightness-normal transition duration-300"/>
                                <span className="text-primary-500 font-inter font-semibold text-base leading-6 tracking-tighter">Inbox</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <ul className='flex items-center space-x-4'>
                    <li className="inline-flex items-end gap-4">
                        <a className="flex items-end gap-1" href="/inbox">
                            <Image src="/navicons/frame.svg" alt="account icon" width={32} height={32} className="brightness-normal transition duration-300"/>
                            <span className="text-primary-500 font-inter font-semibold text-base leading-6 tracking-tighter">Account</span>
                        </a>
                    </li>
                    <li className="inline-flex items-end gap-4">
                        <button className="flex items-end gap-1 cursor-pointer" onClick={ handleLogout }>
                            <Image src="/navicons/logout.svg" alt="logout icon" width={32} height={32} className="brightness-normal transition duration-300"/>
                            <span className="text-primary-500 font-inter font-semibold text-base leading-6 tracking-tighter">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

