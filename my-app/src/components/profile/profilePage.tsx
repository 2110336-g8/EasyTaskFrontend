"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from '../ui/use-toast';
import dayjs from 'dayjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TaskCard from '../taskList/taskCard';
import { instance } from "@/utils/axiosInstance";
import { clientStorage } from "@/utils/storageService";
import { UserProfile } from '@/types/user';
import { Skeleton } from "@/components/ui/skeleton"
import { Task, TaskCardProps } from '@/types/task';
import { TaskStateOptions } from '@/types/task';
import ProfileCard from "./profileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Profile() {
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [userImg, setUserImg] = useState("");
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
        const fetchOwnedTasks = async () => {
            if (!userData || !userData.ownedTasks) return;
            setLoadingTasks(true);
    
            try {
                const tasksToFetch = userData.ownedTasks.filter(taskId => !pastTasks.some(task => task._id === taskId) && !openTasks.some(task => task._id === taskId));
                const taskFetchPromises = tasksToFetch.map(taskId => fetchTaskById(taskId));
                const fetchedTasks = await Promise.all(taskFetchPromises);
    
                fetchedTasks.forEach(task => {
                    if (task) {
                        if (task.status === TaskStateOptions.OPEN || task.status === TaskStateOptions.INPROGRESS) {
                            setOpenTasks([...openTasks, task]);
                        } else if (task.status === TaskStateOptions.COMPLETED || task.status === TaskStateOptions.CLOSED) {
                            setPastTasks([...pastTasks, task]);
                        }
                    }
                });

            } catch (error) {
                console.error('Error fetching owned tasks:', error);
            } finally {
                setLoadingTasks(false);
            }
        };
    
        fetchOwnedTasks();
    }, [userData, openTasks, pastTasks]);
    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const id = clientStorage.get().user._id;
                if (!id) {
                    return;
                }
                const userDataResponse = await instance.get(`/v1/users/${id}`);
                const userImageResponse = await instance.get(`/v1/users/${id}/profile-image`);

                if (userDataResponse.data.user) {
                    setUserData(userDataResponse.data.user);
                    setUserImg(userImageResponse.data);
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Login Required',
                        description: 'You need to login first to view your profile.',
                    });
                }
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

    return (
		<div className="flex flex-col self-stretch pb-10 text-xl font-semibold tracking-normal leading-7">
			<div className="w-full bg-indigo-300 rounded-md min-h-[160px] max-md:max-w-full" />
            <div className='z-10 -mt-10 max-w-full rounded-full'>
                <ProfileCard />
            </div>
            <Tabs defaultValue="open" className="flex flex-col items-center justify-center">
                <TabsList className="flex gap-3 p-3 text-xl font-semibold tracking-normal leading-7 rounded-md bg-slate-100">
                    <TabsTrigger value="open" className='justify-center rounded-md'>Open for Apply</TabsTrigger>
                    <TabsTrigger value="past" className='justify-center rounded-md'>Experience</TabsTrigger>
                </TabsList>
                <TabsContent value="open">Make changes to your account here.</TabsContent>
                <TabsContent value="past">Change your password here.</TabsContent>
            </Tabs>
        </div>
    );
}