'use client';
import React from 'react';
import { toast } from '../ui/use-toast';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TaskCard from '../taskList/taskCard';
import { useEffect, useState } from 'react';
import { instance } from "@/utils/axiosInstance";
import { clientStorage } from "@/utils/storageService";
import { UserProfile } from '@/types/user';
import { Skeleton } from "@/components/ui/skeleton"
import { Task } from '@/types/task';

export interface profile {
    avatarImg?: string;
    bannerImg?: string;
    username: string;
    rating: number;
    description: string;
    tel: string;
}

const mockData: profile = {
    username: 'Morty Smith',
    rating: 4.8,
    description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc congue',
    tel: '0XX-XXX-XXXX',
};
const jobData = [
    {
        taskId: 1,
        title: 'Task 1',
        startDate: '2024-03-10',
        endDate: '2024-03-15',
        location: 'Location 1',
        workers: 5,
        category: 'Category 1',
        wages: 100,
    },
    {
        taskId: 2,
        title: 'Task 2',
        startDate: '2024-03-12',
        endDate: '2024-03-17',
        location: 'Location 2',
        workers: 3,
        category: 'Category 2',
        wages: 150,
    },
    {
        taskId: 3,
        title: 'Task 3',
        startDate: '2024-03-14',
        endDate: '2024-03-19',
        location: 'Location 3',
        workers: 7,
        category: 'Category 3',
        wages: 200,
    },
    {
        taskId: 4,
        title: 'Task 4',
        startDate: '2024-03-16',
        endDate: '2024-03-21',
        location: 'Location 4',
        workers: 2,
        category: 'Category 1',
        wages: 120,
    },
    {
        taskId: 5,
        title: 'Task 5',
        startDate: '2024-03-18',
        endDate: '2024-03-23',
        location: 'Location 5',
        workers: 6,
        category: 'Category 2',
        wages: 180,
    },
];
const pastData = [
    {
        taskId: 1,
        title: 'Task 1',
        startDate: '2024-03-10',
        endDate: '2024-03-15',
        location: 'Location 1',
        workers: 5,
        category: 'Category 1',
        wages: 100,
    },
    {
        taskId: 2,
        title: 'Task 2',
        startDate: '2024-03-12',
        endDate: '2024-03-17',
        location: 'Location 2',
        workers: 3,
        category: 'Category 2',
        wages: 150,
    },
    {
        taskId: 3,
        title: 'Task 3',
        startDate: '2024-03-14',
        endDate: '2024-03-19',
        location: 'Location 3',
        workers: 7,
        category: 'Category 3',
        wages: 200,
    },
    {
        taskId: 4,
        title: 'Task 4',
        startDate: '2024-03-16',
        endDate: '2024-03-21',
        location: 'Location 4',
        workers: 2,
        category: 'Category 1',
        wages: 120,
    },
    {
        taskId: 5,
        title: 'Task 5',
        startDate: '2024-03-18',
        endDate: '2024-03-23',
        location: 'Location 5',
        workers: 6,
        category: 'Category 2',
        wages: 180,
    },
    {
        taskId: 6,
        title: 'Task 6',
        startDate: '2024-03-20',
        endDate: '2024-03-25',
        location: 'Location 6',
        workers: 4,
        category: 'Category 3',
        wages: 220,
    },
    {
        taskId: 7,
        title: 'Task 7',
        startDate: '2024-03-22',
        endDate: '2024-03-27',
        location: 'Location 7',
        workers: 3,
        category: 'Category 1',
        wages: 130,
    },
    {
        taskId: 8,
        title: 'Task 8',
        startDate: '2024-03-24',
        endDate: '2024-03-29',
        location: 'Location 8',
        workers: 5,
        category: 'Category 2',
        wages: 160,
    },
];


export default function Profile() {
    const data = mockData;
    const openTask = jobData;
    const pastTask = pastData;

    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [userImg, setUserImg] = useState("")
    const [tasks, setTasks] = useState<Task[]>([]);

    const copylink = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const fetchTaskById = async (taskId: string): Promise<Task | null> => {

        try {
            const response = (await instance.get(`/v1/tasks/${taskId}`)).data;
            const responseData = await response.json();

            console.log(responseData)

            if ('error' in responseData) return null;

            return responseData.task;
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast({
                variant: 'destructive',
                title: 'Error Fetching User Data',
                description: 'Failed to fetch user data. Please try again later.',
            });
        }

    };

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
    }, [userData]);

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
    }, [userImg]);

    useEffect(() => {
        const fetchOwnedTasks = async () => {

            if (!userData?.tasks) return;

            const fetchedTasks: Task[] = [];
            for (const taskId of userData.ownedTasks) {
                const task = await fetchTaskById(taskId);
                if (task) {
                    fetchedTasks.push(task);
                }
            }
            setTasks(fetchedTasks);
            console.log(tasks)
        };

        fetchOwnedTasks();

    }, [tasks]);

    return (
        <div className='flex flex-col pb-10'>
            <div className='flex flex-col items-start px-16 pt-16 w-full bg-indigo-300 max-md:px-5 max-md:max-w-full aspect-w-[26px] aspect-h-[5px]'>
                <Avatar className='z-10 -mb-16 w-60 h-60 rounded-full aspect-square max-md:mb-2.5 max-md:ml-1'>
                    <AvatarImage
                        src={
                            userImg === "" ? 
                                '/ProfilePicEmpty.png'
                                : 
                                userImg}
                        alt='@shadcn'
                        loading='lazy'
                    />
                    <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
            </div>
            <div className='flex gap-5 mx-20 mt-20 leading-6 whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:mt-10'>
                <div className='text-4xl font-semibold tracking-tight leading-[54px] text-slate-900'>
                    {userData ? `${userData?.firstName} ${userData?.lastName}` : <Skeleton className="h-6 w-[250px]" />}
                </div>
            </div>
            <div className='mx-20 mt-4 text-base leading-6 text-slate-900 max-md:mr-2.5 max-md:max-w-full'>
                {userData ? (
                        <div>{data.description}</div>
                ) : (
                    <Skeleton className="h-12 w-[420px]" />
                )}
            </div>
            <div className='flex gap-5 self-start mt-4 ml-20 text-xl font-semibold tracking-normal leading-7 whitespace-nowrap max-md:ml-2.5'>
                {userData?.phoneNumber && (
                    <Button
                        variant='outline'
                        className='grow justify-center px-4 py-3 bg-black text-white hover:bg-gray-600 hover:text-white'
                        onClick={() => navigator.clipboard.writeText(userData.phoneNumber!)} // set to Copied!
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
                {userData && userData.tasks ? (
                    <div className='flex flex-wrap justify-start gap-x-8 gap-y-8 mt-8'>
                        {userData.tasks
                            .filter(task => task.status === 'In Progress') 
                            .map(task => (
                                <TaskCard
                                    key={task.taskId}
                                    {...task}
                                    className='flex-grow'
                                />
                            ))}
                    </div>
                ) : (
                    <div className="italic text-sm text-gray-300">- This user has no current job openings -</div>
                )}
            </div>
            <div className='mx-20 mt-12 text-3xl font-semibold tracking-tight leading-9 text-slate-900 max-md:mt-10 max-md:mr-5 max-md:max-w-full'>
                Past Jobs
                {userData && userData.tasks ? (
                    <div className='flex flex-wrap justify-start gap-x-8 gap-y-8 mt-8'>
                    {userData?.tasks
                        .filter(task => task.status === 'Completed') 
                        .map(task => (
                            <TaskCard
                                key={task.taskId}
                                {...task}
                                className='flex-grow'
                            />
                    ))}
                    </div>
                ) : (
                    <div className="italic text-sm text-gray-300">-This user has no past jobs-</div>
                )}
            </div>
        </div>
    );
}