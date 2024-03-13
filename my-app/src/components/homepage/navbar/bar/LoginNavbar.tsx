"use client"

import Image from 'next/image';
import { clientStorage } from '@/utils/storageService';

export default function LoginNavbar() {

    const handleLogout = () => {
        clientStorage.remove();
        window.location.reload();
    };

    return (
        <div key="loginNavbar" className='fixed bg-slate-100 w-full h-[72px] z-50 flex items-center justify-center text-base gap-8 whitespace-nowrap max-md:px-5'>
            <div className='flex gap-5 justify-between w-full max-w-[1328px] max-md:flex-wrap max-md:max-w-full'>
                <div className="flex items-center gap-4">
                    <a href="/" className="flex gap-5 justify-between max-md:flex-wrap">
                        <Image src="/logo.svg" alt="Logo" width={58} height={32} loading='lazy' className="shrink-0 my-auto aspect-[1.82] w-[58px]"/>
                        <div className="absolute inset-0 bg-white opacity-0 transition duration-250"></div>
                    </a>
                    <ul className='flex items-center space-x-4'>
                        <li className="flex flex-auto gap-4">
                            <a className="flex items-end gap-1" href="/">
                                <Image src="/navicons/briefcase.svg" alt="job icon" width={32} height={32} loading='lazy' className="shrink-0 w-6 aspect-square "/>
                                <span className="text-primary-500 font-inter font-semibold text-base leading-6 tracking-tighter">Your Jobs</span>
                            </a>
                        </li>
                        <li className="flex flex-auto gap-4">
                            <a className="flex items-end gap-1" href="/ads">
                                <Image src="/navicons/megaphone.svg" alt="ads icon" width={32} height={32} loading='lazy' className="shrink-0 w-6 aspect-square"/>
                                <span className="text-primary-500 font-inter font-semibold text-base leading-6 tracking-tighter">Your Ads</span>
                            </a>
                        </li>
                        <li className="flex flex-auto gap-4">
                            <a className="flex items-end gap-1" href="/inbox">
                                <Image src="/navicons/send.svg" alt="inbox icon" width={32} height={32} loading='lazy' className="shrink-0 w-6 aspect-square"/>
                                <span className="text-primary-500 font-inter font-semibold text-base leading-6 tracking-tighter">Inbox</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <ul className='flex items-center space-x-4'>
                    <li className="flex flex-auto gap-4">
                        <a className="flex items-end gap-1" href="/profile">
                            <Image src="/navicons/frame.svg" alt="account icon" width={32} height={32} loading='lazy' className="shrink-0 w-6 aspect-square"/>
                            <span className="text-primary-500 font-inter font-semibold text-base leading-6 tracking-tighter">Profile</span>
                        </a>
                    </li>
                    <li className="flex flex-auto gap-4">
                        <a className="flex items-end gap-1" onClick={ handleLogout }>
                            <Image src="/navicons/logout.svg" alt="logout icon" width={32} height={32} loading='lazy' className="shrink-0 w-6 aspect-square"/>
                            <span className="text-primary-500 font-inter font-semibold text-base leading-6 tracking-tighter">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
