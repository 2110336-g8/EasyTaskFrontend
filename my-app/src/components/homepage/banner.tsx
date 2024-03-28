import React from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LayoutBox: React.FC = () => {
    const router = useRouter();
    const handleTasklistClick = () => {
        // Replace '/your-route' with the desired route
        router.push('/task');
    };
    const handleCreateTaskClick = () => {
        // Replace '/your-route' with the desired route
        router.push('/task/create');
    };
    return (
        <div className= 'px-[200px] py-[0px] flex flex-col gap-[40px] w-screen'>
            <div className='bg-primary-100 w-full font-sans rounded-lg px-[32px] py-[32px] flex items-center justify-between gap-[40px]'>
                <div className='left-side w-5/12 flex justify-between h-full flex-col'>
                    <div className='description text-slate-500 font-h4 text-h4 tracking-h4'>
                        For Client
                    </div>
                    <div className='header text-slate-900 font-bold text-[64px] leading-[68px] tracking-[-0.01em]'>
                        Find talent <br/> & get jobs done
                    </div>
                    <button
                        className='button bg-primary-500 font-h2 text-h3 tracking-h3 w-full h-[48px]'
                        onClick={handleCreateTaskClick}
                    >
                        Create your job ads
                    </button>
                </div>
                <div className='right-side w-7/12 h-full flex items-center'>
                    <Image
                        src='/banner1.png'
                        alt='Image'
                        className='image object-cover'
                        width={2000}
                        height={1500}
                    />
                </div>
                <style jsx>{`
                    .button {
                        color: #fff;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        margin-top: 7px;
                    }
                    .button:hover {
                        opacity: 0.8;
                    }
                    .image {
                        max-width: 100%;
                        height: auto;
                    }
                `}</style>
            </div>
            <div className='bg-primary-100 w-full font-sans rounded-lg px-[32px] py-[32px] flex items-center justify-between gap-[40px]'>
                <div className='right-side w-7/12 flex items-center'>
                    <Image
                        src='/banner2.png'
                        alt='Image'
                        className='image object-cover'
                        width={2000}
                        height={1500}
                    />
                </div>
                <style jsx>{`
                    .button {
                        color: #fff;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        margin-top: 7px;
                    }
                    .button:hover {
                        opacity: 0.8;
                    }
                    .image {
                        max-width: 100%;
                        height: auto;
                    }
                `}</style>
                <div className='left-side w-5/12 flex justify-between h-full flex-col'>
                    <div className='description text-slate-500 font-h4 text-h4 tracking-h4'>
                        For Talent
                    </div>
                    <div className='header text-slate-900 font-bold text-[64px] leading-[68px] tracking-[-0.01em]'>
                        Explore great <br/> work to earn
                    </div>
                    <button
                        className='button bg-primary-500 font-h2 text-h3 tracking-h3 w-full h-[48px]'
                        onClick={handleTasklistClick}
                    >
                        Apply Your Dream Job
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LayoutBox;
