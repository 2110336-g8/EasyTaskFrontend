import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { clientStorage } from '@/utils/storageService';
import { Button } from '@/components/ui/button';
import { Task, ViewTaskProps } from '@/types/task';
import { ArrowLeftIcon } from 'lucide-react';
import Map from '@/components/createTask/mapBox';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const api = axios.create({
    baseURL: 'http://api.easytask.vt.in.th/v1/tasks/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function ViewTask(props: ViewTaskProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!clientStorage.get().token);
    const [hasApplied, setHasApplied] = useState(false);
    const [taskDetails, setTaskDetails] = useState<Task | null>(null);

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
            const response = await api.post(`${props.taskId}/apply`, null, {
                headers: {
                    'Authorization': `Bearer ${clientStorage.get().token}` 
                }
            });

            if (response.status === 200) {
                toast({
                    variant: 'default',
                    title: 'Task Applied',
                    description: 'You have successfully applied for this task.',
                });
                setHasApplied(true);
            } else {
                const errorData = response.data;
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
                description: 'An error occurred while applying for the task. Please try again later.',
            });
        }
    }

    useEffect(() => {
        async function fetchTaskDetails() {
            try {
                const response = await api.get(`${props.taskId}`);
                if (response.status === 200) {
                    const taskData = response.data;
                    setTaskDetails(taskData);
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Error Fetching Task',
                        description: 'Failed to fetch task details.',
                    });
                }
            } catch (error) {
                console.error('Error fetching task details:', error);
                toast({
                    variant: 'destructive',
                    title: 'Error Fetching Task',
                    description: 'An error occurred while fetching task details.',
                });
            }
        }

        if (isLoggedIn) {
            fetchTaskDetails();
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
                {taskDetails && (
                    <div>
                        <div className='w-full flex flex-row justify-between gap-[8px]'>
                            <h1 className='max-w-[500px] text-slate-900 text-balance break-words '>
                                {taskDetails.title}
                            </h1>
                            <Button onClick={applyTaskHandler} disabled={!isLoggedIn || hasApplied}>
                                {hasApplied ? "Applied" : isLoggedIn ? "Apply Now" : "Please Login"}
                            </Button>
                        </div>
                        <div className='w-full h-[360px] '>
                            <img
                                src={taskDetails.image || '/mocktask.png'}
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
                                    {taskDetails.category}
                                </p>
                                <h4 className='justify-self-center text-center text-slate-700'>
                                    {taskDetails.workers}
                                </h4>
                                <h2 className='justify-self-end text-slate-700'>
                                    ฿ {taskDetails.wages}
                                </h2>
                            </div>
                            {taskDetails.description && (
                                <div className='flex flex-col gap-[8px]'>
                                    <h4 className='text-slate-900'>Description</h4>
                                    <p className='text-slate-600 text-pretty break-words'>
                                        {taskDetails.description}
                                    </p>
                                </div>
                            )}
                            <div className='flex flex-col gap-[8px]'>
                                <h4 className='text-slate-900'>Duration</h4>
                                <p className='text-slate-600'>
                                    {taskDetails.startDate.toLocaleDateString()} - {taskDetails.endDate.toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        {taskDetails.location && (
                            <div className='flex flex-col gap-[8px]'>
                                <h4 className='text-slate-900'>Location</h4>
                                <p className='text-slate-600'>{taskDetails.location.name}</p>
                                {/* change to map later */}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
