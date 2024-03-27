'use client';

import { TaskCardProps } from '@/types/task';
import Link from 'next/link';
import Image from 'next/image';
import {
    CalendarDaysIcon,
    MapPinIcon,
    UserIcon,
    UsersIcon,
} from 'lucide-react';
import { Button } from '../ui/button';

const formatTeam = (workers: string) => {
    const numWorkers = parseInt(workers);

    if (numWorkers === 1) {
        return 'Individual';
    } else if (numWorkers > 10) {
        return 'Team: 10+ people';
    } else {
        return 'Team: ' + workers + ' people';
    }
};

export default function TaskCard(props: TaskCardProps) {
    return (
        <Link
            href={'/task/' + props.taskId}
            className='rounded-lg bg-card text-card-foreground hover:shadow-md inner-border col-span-1 h-[400px] w-[320px] overflow-hidden'
        >
            <div className='w-full h-[180px]'>
                <Image
                    width={0}
                    height={0}
                    sizes='100vw'
                    src={props.imageUrl || '/mocktask.png'}
                    alt=''
                    className='w-full h-full object-cover'
                    loading='lazy'
                />
            </div>
            <div className='flex flex-col justify-between w-full h-[220px] p-[16px] pt-[8px]'>
                <h3 className='text-slate-900 line-clamp-2 break-words'>
                    {props.title}
                </h3>
                <div className='flex flex-col gap-[4px]'>
                    <small className='w-full gap-[4px] flex items-center text-slate-500'>
                        <CalendarDaysIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                        Apply: {props.startDate} - {props.endDate}
                    </small>
                    {props.location ? (
                        <small className='w-full gap-[4px] flex items-center text-slate-500'>
                            <MapPinIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                            Location: {props.location}
                        </small>
                    ) : null}
                    {props.workers ? (
                        <small className='w-full gap-[4px] flex items-center text-slate-500'>
                            {props.workers === '1' ? (
                                <UserIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                            ) : (
                                <UsersIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                            )}
                            {formatTeam(props.workers)}
                        </small>
                    ) : null}
                </div>
                <div className='w-full flex flex-row justify-between'>
                    {props.category ? (
                        <div className='inline-flex whitespace-nowrap text-button-xs font-button-xs tracking-button-xs px-[12px] py-[4px] rounded-[6px] border-[1px] border-primary-500 text-primary-500 max-w-[140px] overflow-x-auto'>
                            {props.category}
                        </div>
                    ) : (
                        <div />
                    )}
                    <div className='self-end font-button-m text-button-m tracking-button-m text-slate-700'>
                        ฿ {props.wages}
                    </div>
                </div>
            </div>
        </Link>
    );
}
