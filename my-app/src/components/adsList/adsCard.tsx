'use client';

import { AdsCardProps } from '@/types/task';
import Link from 'next/link';
import { ClockIcon, InboxIcon, MapPinIcon } from 'lucide-react';

export default function AdsCard(props: AdsCardProps) {
    return (
        <Link
            href={'/ads/' + props.taskId}
            className='rounded-lg bg-card flex text-card-foreground hover:shadow-md inner-border w-[1328px] h-auto overflow-hidden'
        >
            <div className=''>
                <img
                    className='w-[320px] h-[180px] object-cover'
                    src={props.image || '/mocktask.png'}
                    alt={''}
                />
            </div>
            
            <div className='flex flex-col  h-auto w-full p-[16px] '>
                <h3 className='text-slate-900 line-clamp-2 break-words py-[24px]'>
                    {props.title}
                </h3>
                <div className='flex flex-row gap-[24px] '>
                    <small className='inline-block whitespace-nowrap gap-[4px] flex items-center text-slate-500'>
                        <ClockIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                        {props.startDate} - {props.endDate}
                    </small>
                    {props.location ? (
                        <small className='inline-block whitespace-nowrap gap-[4px] flex items-center text-slate-500'>
                            <MapPinIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                            {props.location}
                        </small>
                    ) : null}
                    {props.applications ? (
                        <small className='inline-block whitespace-nowrap gap-[4px] flex items-center text-slate-500'>
                            <InboxIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                            {props.applications} Applications
                        </small>
                    ) : null}
                </div>
                <div className='w-full flex flex-row '>
                    {props.category ? (
                        <p className='px-[12px] py-[4px] rounded-[6px] border-[1px] border-primary-500 text-primary-500'>
                            {props.category}
                        </p>
                    ) : (
                        <div />
                    )}
                    <div className='font-extrabold text-[24px]/[32px] tracking-[.006em] text-slate-700'>
                        ฿ {props.wages}
                    </div>
                </div>
            </div>
        </Link>
    );
}
