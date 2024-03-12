'use client';

import { toast } from '../ui/use-toast';
import { clientStorage } from '@/utils/storageService';
import { Button } from '@/components/ui/button';
import { ViewTaskProps } from '@/types/task';
import { ArrowLeftIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ViewTask(props: ViewTaskProps) {

    const [isLoggedIn, setIsLoggedIn] = useState(!!clientStorage.get().token);
    const [hasApplied, setHasApplied] = useState(false);

    console.log(isLoggedIn)

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
            const response = await fetch('http://api.easytask.vt.in.th/v1/tasks/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${clientStorage.get().token}` 
                },
                body: JSON.stringify({ taskId: props.taskId }) 
            });

            if (response.ok) {
                toast({
                    variant: 'default',
                    title: 'Task Applied',
                    description: 'You have successfully applied for this task.',
                });
            } else {
                const errorData = await response.json();
                toast({
                    variant: 'destructive',
                    title: 'Application Error',
                    description: errorData.message || 'An error occurred while applying for the task.',
                });
            }
        } catch (error) {
            console.error('Error applying for task:', error);
            toast({
                variant: 'destructive',
                title: 'Application Error',
                description: 'An error occurred while applying for the task. Please try again later.',
            });
        }
    }

    useEffect(() => {
        async function checkAppliedStatus() {
            try {
                const response = await fetch(`http://api.easytask.vt.in.th/v1/tasks/${props.taskId}/check`, {
                    headers: {
                        'Authorization': `Bearer ${clientStorage.get().token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setHasApplied(data.hasApplied);
                } else {
                    const errorData = await response.json();
                    console.error('Error checking application status:', errorData.message);
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
                    <Button onClick={applyTaskHandler} disabled={!isLoggedIn || hasApplied}>
                        {!isLoggedIn ? "Please Login" : hasApplied ? "Applied": "Apply Now"}
                    </Button>
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
                    <Button onClick={applyTaskHandler} disabled={!isLoggedIn || hasApplied} className="w-full">
                        {!isLoggedIn ? "Please Login" : hasApplied ? "Applied": "Apply Now"}
                    </Button>
            </div>
        </div>
    );
}
