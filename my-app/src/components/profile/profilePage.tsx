"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from '../ui/use-toast';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import TaskCard from '../taskList/taskCard';
import { instance } from "@/utils/axiosInstance";
import { clientStorage } from "@/utils/storageService";
import { UserCard, UserProfile } from '@/types/user';
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

    const fetchTaskById = async (taskId: string): Promise<Task | null> => {
        try {
            const response = await instance.get(`/v1/tasks/${taskId}`);
            const responseData = response.data;
    
            if ('error' in responseData) return null;
    
            const image: string | null = await fetchTaskImageById(taskId);
    
            const updatedData: Task = {
                ...responseData.task,
                imageUrl: image,
            };
    
            return updatedData;
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

    const fetchTaskImageById = async (taskId: string): Promise<string | null> => {
        try {
            const taskImageResponse = await instance.get(`/v1/tasks/${taskId}/task-image`);
    
            if ('error' in taskImageResponse) return null;

            if (taskImageResponse.status === 404) return null;
    
            const taskImage = await taskImageResponse.data;
    
            return taskImage;
        } catch (error) {
            return null;
        }
    };

    const convertToTaskCardProps = (task: Task): TaskCardProps => {
        return {
            taskId: task._id,
            title: task.title,
            category: task.category,
            imageUrl: task.imageUrl ? task.imageUrl : undefined,
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
                        } else if (task.status === TaskStateOptions.COMPLETED) {
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

                console.log(userDataResponse);
                console.log(userImageResponse);

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
            <div className='flex z-10 -mt-10 max-w-full px-4 md:px-20'>
                <ProfileCard {...userData as UserCard}/>
                <Button className="justify-center text-base md:text-sm px-3 py-2 mt-12 ml-12 md:mt-0 border bg-white text-primary-500 border-primary-500 font-semibold tracking-normal hover:bg-primary-100">
                    Edit Profile
                </Button>
            </div>
            <Tabs defaultValue="open" className="flex flex-col items-center justify-center">
                <TabsList className="flex gap-3 p-3 text-xl font-semibold tracking-normal leading-7 rounded-md bg-slate-100">
                    <TabsTrigger value="open" className='justify-center rounded-md'>Open for Apply</TabsTrigger>
                    <TabsTrigger value="past" className='justify-center rounded-md'>Experience</TabsTrigger>
                </TabsList>
                <TabsContent value="open" className='font-semibold tracking-tight'>
                    <div className='flex flex-wrap justify-start gap-x-4 gap-y-4'>
                        {openTasks.length > 0 ? (
                            openTasks.map(task => (
                                <TaskCard
                                    key={task._id}
                                    {...convertToTaskCardProps(task)}
                                />
                            ))
                        ) : (
                            <div className="italic text-base text-gray-500">- This user has no current job openings -</div>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="past">
                    <div className='flex flex-wrap justify-start gap-x-4 gap-y-4'>
                        {pastTasks.length > 0 ? (
                            pastTasks.map(task => (
                                <TaskCard
                                    key={task._id}
                                    {...convertToTaskCardProps(task)}
                                />
                            ))
                        ) : (
                            <div className="italic text-base text-gray-500">- This user has no past jobs -</div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}