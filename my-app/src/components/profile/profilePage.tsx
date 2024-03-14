import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import TaskCard from '../taskList/taskCard';
import { clientStorage } from '@/utils/storageService';
import { toast } from '../ui/use-toast';
import { User } from '@/types/user';
import { Task } from '@/types/task';



function Profile() {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [openTasks, setOpenTasks] = useState<Task[]>([]);
    const [pastTasks, setPastTasks] = useState<Task[]>([]);
    const isLoggedIn = !!clientStorage.get().token;

    useEffect(() => {
        async function fetchUserData() {
            console.log(isLoggedIn)
            if (!isLoggedIn) {
                toast({
                    variant: 'destructive',
                    title: 'Login Required',
                    description: 'You need to login first to apply for this task.',
                });
                return;
            }
            try {
                const response = await fetch(`http://api.easytask.vt.in.th/v1/users/${clientStorage.get().token}`);
                const data = await response.json();
                console.log(response)
                console.log(data)
                if (response.ok) {
                    setUser(data.user);
                } else {
                    throw new Error(data.error || 'Failed to fetch user profile');
                }
                console.log(user)
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            }
        }

        fetchUserData();
    }, [isLoggedIn]);

    return (
        <div className='flex flex-col pb-10'>
            {user && (
                <div className='flex flex-col items-start px-16 pt-16 w-full bg-indigo-300 max-md:px-5 max-md:max-w-full aspect-w-[26px] aspect-h-[5px]'>
                    <Image
                        src={user.imageUrl}
                        alt={`${user.firstName} ${user.lastName}`}
                        loading='lazy'
                        className='z-10 -mb-16 w-60 h-60 rounded-full aspect-square max-md:mb-2.5 max-md:ml-1'
                    />
                </div>
            )}
            <div className='flex gap-5 mx-20 mt-20 leading-6 whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:mt-10'>
                <div className='text-4xl font-semibold tracking-tight leading-[54px] text-slate-900'>
                    {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                </div>
                {/* <div className='flex gap-2.5 my-auto text-xl font-medium tracking-normal leading-7 text-gray-500'>
                    <Image
                        loading='lazy'
                        width={32}
                        height={32}
                        alt='star'
                        src='./star.svg'
                        className='shrink-0 self-start w-6 aspect-square'
                    />
                    <div>{user?.rating || 0}</div>
                </div> */}
            </div>
            <div className='mx-20 mt-4 text-base leading-6 text-slate-900 max-md:mr-2.5 max-md:max-w-full'>
                {user?.description || 'Loading...'}
            </div>
            <div className='flex gap-5 self-start mt-4 ml-20 text-xl font-semibold tracking-normal leading-7 whitespace-nowrap max-md:ml-2.5'>
                <Button
                    variant='outline'
                    className='grow justify-center px-4 py-3 bg-black text-white hover:bg-gray-600 hover:text-white'
                    asChild
                >
                    <Link href='/phone'>{user?.tel || 'Loading...'}</Link>
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
                    {openTasks.map(task => (
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
                    {pastTasks.map(task => (
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
