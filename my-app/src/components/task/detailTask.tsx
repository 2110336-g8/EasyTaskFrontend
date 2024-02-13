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
                    <Button>Apply Now</Button>
                </div>
                <div className='w-full h-[360px] '>
                    <img
                        src={props.image || '/mocktask.png'}
                        alt=''
                        className='rounded-lg w-full h-full object-cover'
                    />
                </div>
                <div className='flex flex-col gap-[24px]'>
                    <div className='grid grid-cols-3 grid-rows-2 items-center gap-y-[8px]'>
                        <h4 className='text-slate-900 justify-self-start'>
                            Category
                        </h4>
                        <h4 className='text-slate-900 justify-self-center'>
                            Team
                        </h4>
                        <h4 className='text-slate-900 justify-self-end'>
                            All Wages
                        </h4>
                        <p className='justify-self-start px-[12px] py-[4px] rounded-[6px] border-[1px] border-primary-500 text-primary-500'>
                            {props.category}
                        </p>
                        <h4 className='justify-self-center text-center text-slate-700'>
                            {props.workers}
                        </h4>
                        <h2 className='justify-self-end text-slate-700'>
                            ฿ {props.wages}
                        </h2>
                    </div>
                    {props.description ? (
                        <div className='flex flex-col gap-[8px]'>
                            <h4 className='text-slate-900'>Description</h4>
                            <p className='text-slate-600 text-pretty break-words'>
                                {props.description}
                            </p>
                        </div>
                    ) : null}
                    <div className='flex flex-col gap-[8px]'>
                        <h4 className='text-slate-900'>Duration</h4>
                        <p className='text-slate-600'>
                            {props.startDate} - {props.endDate}
                        </p>
                    </div>
                </div>
                    {props.location ? (
                        <div className='flex flex-col gap-[8px]'>
                            <h4 className='text-slate-900'>Location</h4>
                            <p className='text-slate-600'>{props.location}</p>
                            {/* change to map later */}
                        </div>
                    ) : null}
                <Button className='w-full'>Apply Now</Button>
            </div>
        </div>
    );
}
