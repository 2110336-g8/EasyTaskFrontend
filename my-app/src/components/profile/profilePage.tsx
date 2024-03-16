'use client';
import React from 'react';
import { toast } from '../ui/use-toast';
import dayjs from 'dayjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TaskCard from '../taskList/taskCard';
import { useEffect, useState, useCallback } from 'react';
import { instance } from "@/utils/axiosInstance";
import { clientStorage } from "@/utils/storageService";
import { UserProfile } from '@/types/user';
import { Skeleton } from "@/components/ui/skeleton"
import { Task, TaskCardProps } from '@/types/task';
import { TaskStateOptions } from '@/types/task';

export interface profile {
    avatarImg?: string;
    bannerImg?: string;
    username: string;
    rating: number;
    description: string;
    tel: string;
}

export default function Profile() {

    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [userImg, setUserImg] = useState("")
    const [pastTasks, setPastTasks] = useState<Task[]>([]);
    const [openTasks, setOpenTasks] = useState<Task[]>([]);
    const [loadingTasks, setLoadingTasks] = useState(false);

    const copyPhoneNumber = useCallback(() => {
        if (userData?.phoneNumber) {
            navigator.clipboard.writeText(userData.phoneNumber);
        }
    }, [userData?.phoneNumber]);

    const fetchTaskById = async (taskId: string): Promise<Task | null> => {
        try {
            const response = await instance.get(`/v1/tasks/${taskId}`);
            const responseData = response.data;
    
            console.log(responseData);
    
            if ('error' in responseData) return null;
    
            return responseData.task;
        } catch (error) {
            console.error('Error fetching task data:', error);
            toast({
                variant: 'destructive',
                title: 'Error Fetching Task Data',
                description: 'Failed to fetch task data. Please try again later.',
            });
            return null;
        }
    };

    const convertToTaskCardProps = (task: Task): TaskCardProps => {
        return {
            taskId: task._id,
            title: task.title,
            category: task.category,
            imageUrl: task.imageUrls ? task.imageUrls[0] : undefined,
            location: task.location ? task.location.name : undefined,
            wages: task.wages.toString(),
            startDate: dayjs(task.startDate).format('DD MMM YYYY').toString(),
            endDate: dayjs(task.endDate).format('DD MMM YYYY').toString(),
            workers: task.workers.toString()
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const id = clientStorage.get().user._id;
                const userData = (await instance.get(`/v1/users/${id}`)).data.user;

                if (!userData) {
                    toast({
                        variant: 'destructive',
                        title: 'Login Required',
                        description: 'You need to login first to view your profile.',
                    });
                    return;
                }
                console.log(userData);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast({
                    variant: 'destructive',
                    title: 'Error Fetching User Data',
                    description: 'Failed to fetch user data. Please try again later.',
                });
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const id = clientStorage.get().user._id;
            if (!id) {
                return;
            }
            try {
                const res = await instance.get(
                    `v1/users/${id}/profile-image`,
                );
                setUserImg(res.data);
            } catch (error) {
                setUserImg('');
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchOwnedTasks = async () => {
            if (!userData || !userData.ownedTasks) return;
            setLoadingTasks(true);
    
            const fetchedOpenTasks: Task[] = [];
            const fetchedPastTasks: Task[] = [];
    
            const ownedTaskIds = new Set(userData.ownedTasks);
    
            for (const taskId of Array.from(ownedTaskIds)) {
                const task: Task | null = await fetchTaskById(taskId);
    
                if (task) {
                    const isInOpenTasks = openTasks.some(t => t._id === task._id);
                    const isInPastTasks = pastTasks.some(t => t._id === task._id);
    
                    if (!isInOpenTasks && !isInPastTasks) {
                        if (task.status === TaskStateOptions.OPEN || task.status === TaskStateOptions.INPROGRESS) {
                            fetchedOpenTasks.push(task);
                        } else if (task.status === TaskStateOptions.COMPLETED || task.status === TaskStateOptions.CLOSED) {
                            fetchedPastTasks.push(task);
                        }
                    }
                }
            }
    
            setPastTasks(prevPastTasks => [...prevPastTasks, ...fetchedPastTasks]); 
            setOpenTasks(prevOpenTasks => [...prevOpenTasks, ...fetchedOpenTasks]); 
            setLoadingTasks(false);
        };
    
        fetchOwnedTasks();
    }, [userData]);

    return (
        <div className='flex flex-col pb-10'>
            <div className='flex flex-col items-start px-16 pt-16 w-full bg-indigo-300 max-md:px-5 max-md:max-w-full aspect-w-[26px] aspect-h-[5px]'>
                <Avatar className='z-10 -mb-16 w-60 h-60 rounded-full aspect-square max-md:mb-2.5 max-md:ml-1' style={{ backgroundColor: userImg === "" ? "white" : "transparent" }}>
                    <AvatarImage
                        src={userImg === "" ? '/ProfilePicEmpty.png' : userImg}
                        loading='lazy'
                        width={60}
                        height={60}
                    />
                    <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
            </div>
            <div className='flex gap-5 mx-20 mt-20 leading-6 whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:mt-10'>
                <div className='text-4xl font-semibold tracking-tight leading-[54px] text-slate-900'>
                    {userData ? `${userData?.firstName} ${userData?.lastName}` : <Skeleton className="h-6 w-[250px]" />}
                </div>
            </div>
            <div className='flex gap-5 self-start mt-4 ml-20 text-xl font-semibold tracking-normal leading-7 whitespace-nowrap max-md:ml-2.5'>
                {userData?.phoneNumber && (
                    <Button
                        variant='outline'
                        className='grow justify-center px-4 py-3 bg-black text-white hover:bg-gray-600 hover:text-white'
                        onClick={copyPhoneNumber} 
                    >
                        {userData.phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')} 
                    </Button>
                )}
                {userData ? (
                    <Button
                        variant='outline'
                        className='grow justify-center px-4 py-3 rounded-md border-2 border-solid border-border-black bg-white text-black hover:text-gray-600'
                        onClick={() => {}}
                    >
                        <Link href='/account'>Edit Profile</Link>
                    </Button>
                ) : (
                    <Skeleton className="h-12 w-[250px]" />
                )}
            </div>
            <div className='mx-20 mt-12 text-3xl font-semibold tracking-tight leading-9 text-slate-900 max-md:mt-10 max-md:mr-5 max-md:max-w-full'>
                Open Jobs
                {openTasks.length > 0 ? (
                    <div className='flex flex-wrap justify-start gap-x-8 gap-y-8 mt-8'>
                        {openTasks
                            .map(task => (
                                <TaskCard
                                    key={task._id}
                                    {...convertToTaskCardProps(task)}
                                    className='flex-grow'
                                />
                            ))}
                    </div>
                ) : (
                    <div className="italic text-base text-gray-300">- This user has no current job openings -</div>
                )}
            </div>
            <div className='mx-20 mt-12 text-3xl font-semibold tracking-tight leading-9 text-slate-900 max-md:mt-10 max-md:mr-5 max-md:max-w-full'>
                Past Jobs
                {pastTasks.length > 0 ? (
                    <div className='flex flex-wrap justify-start gap-x-8 gap-y-8 mt-8'>
                    {pastTasks
                        .map(task => (
                            <TaskCard
                                key={task._id}
                                {...convertToTaskCardProps(task)}
                                className='flex-grow'
                            />
                    ))}
                    </div>
                ) : (
                    <div className="italic text-base text-gray-300">- This user has no past jobs -</div>
                )}
            </div>
        </div>
    );
}