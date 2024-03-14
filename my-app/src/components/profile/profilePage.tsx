'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TaskCard from '../taskList/taskCard';
import { clientStorage } from '@/utils/storageService';
import { toast } from '../ui/use-toast';

export interface profile {
    avatarImg?: string;
    bannerImg?: string;
    username: string;
    rating: number;
    description: string;
    tel: string;
}

interface userData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    ownedTasks: string[];
    applications: {
        taskId: string;
        status: string;
        createdAt: string;
        _id: string;
    }[];
    tasks: string[]; 
    createdAt: string;
    updatedAt: string;
    __v: number;
    imageKey: string;
    imageUrl: string;
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

    const [isLoggedIn, setIsLoggedIn] = useState(!!clientStorage.get().token);

    // async function getUserData(): Promise<userData | undefined> {
    //     if (!isLoggedIn) {
    //         toast({
    //             variant: 'destructive',
    //             title: 'Login Required',
    //             description: 'You need to login first to apply for this task.',
    //         });
    //         return undefined;
    //     }
    
    //     try {
    //         const response = await fetch(`http://api.easytask.vt.in.th/v1/users/${clientStorage.get().token}`);
    //         const data = await response.json();
    //         if (response.ok) {
    //             return data.user as userData;
    //         } else {
    //             throw new Error(data.error || 'Failed to fetch user profile');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user profile:', error.message);
    //         return undefined;
    //     }
    // }

    return (
        <div className='flex flex-col pb-10'>
            <div className='flex flex-col items-start px-16 pt-16 w-full bg-indigo-300 max-md:px-5 max-md:max-w-full aspect-w-[26px] aspect-h-[5px]'>
                <Avatar className='z-10 -mb-16 w-60 h-60 rounded-full aspect-square max-md:mb-2.5 max-md:ml-1'>
                    <AvatarImage
                        src='https://github.com/shadcn.png'
                        alt='@shadcn'
                        loading='lazy'
                    />
                    <AvatarFallback>UserAvatar</AvatarFallback>
                </Avatar>
            </div>
            <div className='flex gap-5 mx-20 mt-20 leading-6 whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:mt-10'>
                <div className='text-4xl font-semibold tracking-tight leading-[54px] text-slate-900'>
                    {data.username}
                </div>
                <div className='flex gap-2.5 my-auto text-xl font-medium tracking-normal leading-7 text-gray-500'>
                    <Image
                        loading='lazy'
                        width={32}
                        height={32}
                        alt='star'
                        src='./star.svg'
                        className='shrink-0 self-start w-6 aspect-square'
                    />
                    <div>{data.rating}</div>
                </div>
            </div>
            <div className='mx-20 mt-4 text-base leading-6 text-slate-900 max-md:mr-2.5 max-md:max-w-full'>
                {data.description}
            </div>
                <div className='flex gap-5 self-start mt-4 ml-20 text-xl font-semibold tracking-normal leading-7 whitespace-nowrap max-md:ml-2.5'>
                <Button
                    variant='outline'
                    className='grow justify-center px-4 py-3 bg-black text-white hover:bg-gray-600 hover:text-white'
                    asChild
                >
                    <Link href='/phone'>{data.tel}</Link>
                </Button>
                <Button
                    variant='outline'
                    className='grow justify-center px-4 py-3 rounded-md border-2 border-solid border-border-black bg-white text-black hover:text-gray-600'
                    asChild
                >
                    <Link href='/account'>Edit Profile</Link>
                </Button>
            </div>
            {/* deafult is 20 */}
            <div className='mx-20 mt-12 text-3xl font-semibold tracking-tight leading-9 text-slate-900 max-md:mt-10 max-md:mr-5 max-md:max-w-full'>
                Open Jobs
                <div className='flex flex-wrap justify-start gap-x-8 gap-y-8 mt-8'>
                    {openTask.map(task => (
                        <TaskCard
                            key={task.taskId}
                            {...task}
                            className='flex-grow'
                        />
                    ))}
                </div>
            </div>

            <div className='mx-20 mt-12 text-3xl font-semibold tracking-tight leading-9 text-slate-900 max-md:mt-10 max-md:mr-5 max-md:max-w-full'>
                Past Jobs
                <div className='flex flex-wrap justify-start gap-x-8 gap-y-8 mt-8'>
                    {pastTask.map(task => (
                        <TaskCard
                            key={task.taskId}
                            {...task}
                            className='flex-grow'
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
