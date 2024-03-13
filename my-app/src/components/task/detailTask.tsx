'use client';

import { toast } from '../ui/use-toast';
import { clientStorage } from '@/utils/storageService';
import { Button } from '@/components/ui/button';
import { ViewTaskProps } from '@/types/task';
import { ArrowLeftIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import MapReadOnly from '../map/mapBoxReadOnly';

export default function ViewTask(props: ViewTaskProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!clientStorage.get().token);
    const [hasApplied, setHasApplied] = useState(false);

    async function applyTaskHandler() {
        if (!isLoggedIn) {
            toast({
                variant: 'destructive',
                title: 'Login Required',
                description: 'You need to login first to apply for this task.',
            });
            return;
        }

        try {
            const response = await fetch(`http://api.easytask.vt.in.th/v1/tasks/${props.taskId}/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${clientStorage.get().token}` 
                }
            });

            if (response.ok) {
                toast({
                    variant: 'default',
                    title: 'Task Applied',
                    description: 'You have successfully applied for this task.',
                });
                setHasApplied(true); // Update state to reflect application status
            } else {
                const errorData = await response.json();
                toast({
                    variant: 'destructive',
                    title: 'Application Error',
                    description: errorData.error || 'An error occurred while applying for the task.',
                });
            }
        } catch (error) {
            console.error('Error applying for task:', error);
            toast({
                variant: 'destructive',
                title: 'Application Error',
                description:
                    'An error occurred while applying for the task. Please try again later.',
            });
        }
    }

    useEffect(() => {
        async function checkAppliedStatus() {
            try {
                const response = await fetch(
                    `http://api.easytask.vt.in.th/v1/tasks/${props.taskId}/check`,
                    {
                        headers: {
                            Authorization: `Bearer ${clientStorage.get().token}`,
                        },
                    },
                );

                if (response.ok) {
                    const data = await response.json();
                    setHasApplied(data.hasApplied);
                } else {
                    const errorData = await response.json();
                    console.error('Error checking application status:', errorData.error);
                }
            } catch (error) {
                console.error('Error checking application status:', error);
            }
        }

        if (isLoggedIn) {
            checkAppliedStatus();
        }
    }, [isLoggedIn, props.taskId]);

    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col w-[1000px] gap-[24px]'>
                <div className='absolute'>
                    <a className='relative right-[80px]' href='/task'>
                        <ArrowLeftIcon className=' w-[40px] h-[40px]' />
                    </a>
                </div>
                <div className='w-full flex flex-col gap-[2px]'>
                    <h1 className='text-slate-900 text-balance break-words '>
                        {props.title}
                    </h1>
                    <p className='text-slate-400'>Posted {props.posted} ago</p>
                </div>
                <div className='w-full flex flex-row justify-between gap-[40px]'>
                    <div className='flex flex-col w-[640px] gap-[24px]'>
                        <img
                            src={props.image || '/mocktask.png'}
                            alt=''
                            className='rounded-lg w-full h-full object-cover'
                        />
                        {props.description ? (
                            <div className='flex flex-col gap-[16px]'>
                                <h4 className='text-slate-900'>Description</h4>
                                <p className='text-slate-600 text-pretty break-words'>
                                    {props.description}
                                </p>
                            </div>
                        ) : null}
                        {props.location ? (
                            <div className='flex flex-col gap-[16px]'>
                                <h4 className='text-slate-900'>Location</h4>
                                <p className='text-slate-600'>
                                    {props.location.name}
                                </p>
                                <div>
                                    <MapReadOnly
                                        coord={{
                                            lat: props.location.latitude,
                                            lng: props.location.longitude,
                                        }}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className='flex flex-col w-[320px] gap-[24px]'>
                        <Button
                            onClick={applyTaskHandler}
                            disabled={!isLoggedIn || hasApplied}
                            className='w-full'
                        >
                            {!isLoggedIn
                                ? 'Please Login'
                                : hasApplied
                                  ? 'Applied'
                                  : 'Apply Now'}
                        </Button>
                        <div className='grid grid-cols-4 items-center grid-rows-4 gap-x-[8px] gap-y-[16px]'>
                            <p className='col-span-1 text-slate-900'>
                                Category
                            </p>
                            <div className='col-span-3 flex'>
                                <p className='px-[12px] py-[4px] rounded-[6px] border-[1px] border-primary-500 text-primary-500'>
                                    {props.category}
                                </p>
                            </div>
                            <p className='col-span-1 text-slate-900'>Team</p>
                            <p className='col-span-3 text-slate-700'>
                                {props.workers} people
                            </p>
                            <p className='col-span-1 text-slate-900'>Wages</p>
                            <div className='flex col-span-3 items-center gap-[8px]'>
                                <h4 className=' text-slate-700'>
                                    {props.wages}
                                </h4>
                                <p className='text-slate-900'>Baht/person</p>
                            </div>
                            <p className='col-span-1 text-slate-900'>
                                Duration
                            </p>
                            <p className='col-span-3 text-slate-700'>
                                {props.startDate} - {props.endDate}
                            </p>
                        </div>
                        <div className='border-t h-0 border-slate-300'></div>
                        <div className='flex flex-col gap-[16px]'>
                            <h4>About the Client</h4>
                            <div className='flex flex-row items-center gap-[16px]'>
                                <Avatar
                                    style={{ width: '56px', height: '56px' }}
                                >
                                    <AvatarImage
                                        src={props.customer.image}
                                        alt='@shadcn'
                                    />
                                    <AvatarFallback>?</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col gap-[4px]'>
                                    <p>{props.customer.name}</p>
                                    {props.customer.phoneNumber ? (
                                        <p>{props.customer.phoneNumber}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
