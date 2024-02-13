'use client';

import { Button } from '@/components/ui/button';
import { ViewTaskProps } from '@/types/task';
import { ArrowLeftIcon } from 'lucide-react';

export default function ViewTask(props: ViewTaskProps) {
    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col w-[640px] gap-[40px]'>
                <div className='absolute'>
                    <a className='relative right-[80px]' href='/task'>
                        <ArrowLeftIcon className=' w-[40px] h-[40px]' />
                    </a>
                </div>
                <div className='w-full flex flex-row justify-between gap-[8px]'>
                    <h1 className='max-w-[500px] text-slate-900 text-balance break-words '>
                        {props.title}
                    </h1>
                    <Button className=''>Apply Now</Button>
                </div>
                <div className='w-full h-[360px] '>
                    <img
                        src={props.image || '/mocktask.png'}
                        alt=''
                        className='rounded-lg w-full h-full object-cover'
                    />
                </div>
                <div className='flex flex-col gap-[24px]'>
                    <div className='flex justify-between items-center flex-grow flex-shrink'>
                        <div className='flex flex-col gap-[8px] items-start flex-grow flex-shrink'>
                            <h4 className='text-slate-900'>Category</h4>
                            <p className='px-[12px] py-[4px] rounded-[6px] border-[1px] border-primary-500 text-primary-500'>
                                {props.category}
                            </p>
                        </div>
                        <div className='flex flex-col gap-[8px] items-center flex-grow flex-shrink'>
                            <h4 className='text-slate-900'>Team</h4>
                            <div className='h-10 flex flex-col justify-end'>
                                <h4 className='text-center text-slate-700'>
                                    {props.workers}
                                </h4>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[8px] items-end flex-grow flex-shrink'>
                            <h4 className='text-slate-900'>All Wages</h4>
                            <h2 className='text-slate-700'>฿ {props.wages}</h2>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <h4 className='text-slate-900'>Description</h4>
                        <p className='text-slate-600 text-pretty break-words'>
                            {props.description}
                        </p>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <h4 className='text-slate-900'>Duration</h4>
                        <p className='text-slate-600'>
                            {props.startDate} - {props.endDate}
                        </p>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <h4 className='text-slate-900'>Location</h4>
                        <p className='text-slate-600'>{props.location}</p>
                        {/* change to map later */}
                    </div>
                </div>
                <Button className='w-full'>Apply Now</Button>
            </div>
        </div>
    );
}
