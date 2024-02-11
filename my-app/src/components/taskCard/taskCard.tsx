'use client';

import { TaskCardProps } from '@/types/task';
import Link from 'next/link';
import { CalendarDaysIcon, MapPinIcon, UsersIcon } from 'lucide-react';

export default function TaskCard(props: TaskCardProps) {
    return (
        <Link
            href={'/task/' + props.taskId + '/detail'}
            className='rounded-lg bg-card text-card-foreground hover:shadow-md inner-border col-span-6 laptop:col-span-3 h-[400px] w-[320px] overflow-hidden'
        >
            <div className='w-full h-[180px]'>
                <img
                    className='w-full h-full object-cover'
                    src={props.image || '/mocktask.png'}
                    alt={''}
                />
            </div>
            <div className='flex flex-col justify-between w-full h-[220px] p-[16px] pt-[8px]'>
                <div className='flex flex-col gap-[12px]'>
                    <div className='font-h3 text-h3 tracking-h3 text-slate-900 line-clamp-2 break-words'>
                        {props.title}
                    </div>
                    <div className='flex flex-col gap-[4px]'>
                        <div className='w-full gap-[4px] flex items-center font-small text-small tracking-small text-slate-500'>
                            <CalendarDaysIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                            {props.startDate} - {props.endDate}
                        </div>
                        {props.location ? (
                            <div className='w-full gap-[4px] flex items-center font-small text-small tracking-small text-slate-500'>
                                <MapPinIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                                {props.location}
                            </div>
                        ) : null}
                        {props.workers ? (
                            <div className='w-full gap-[4px] flex items-centerfont-small text-small tracking-small text-slate-500'>
                                <UsersIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                                Team up for {props.workers} people
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className='w-full flex flex-row justify-between'>
                    {props.category ? (
                        <div className='px-[12px] py-[4px] rounded-[6px] border-[1px] border-primary-500 font-p text-p tracking-p text-primary-500'>
                            {props.category}
                        </div>
                    ) : (
                        <div />
                    )}
                    <div className='font-extrabold text-[24px]/[32px] tracking-[.006em] text-slate-700'>
                        ฿ {props.wages.toLocaleString()}
                    </div>
                </div>
            </div>
        </Link>
    );
}
