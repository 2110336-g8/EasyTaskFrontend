"use client"
import React, { useEffect, useState } from 'react';
import { toast } from '../ui/use-toast';
import dayjs from 'dayjs';
import TaskCard from '../taskList/taskCard';
import { instance } from "@/utils/axiosInstance";
import { UserCard, UserProfile } from '@/types/user';
import { Task, TaskCardProps } from '@/types/task';
import { TaskStateOptions } from '@/types/task';
import ProfileCard from "./profileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileLoading from './profileLoading';
import { AxiosError } from 'axios';


export default function Profile( data: UserProfile | null ) {
    const [userData, setUserData] = useState(data);
    const [pastTasks, setPastTasks] = useState<Task[]>([]);
    const [openTasks, setOpenTasks] = useState<Task[]>([]);
    const [loadingTasks, setLoadingTasks] = useState(false);

    const fetchTaskById = async (taskId: string): Promise<Task | null> => {
        try {
            const response = await instance.get(`/v1/tasks/${taskId}`);
            const responseData = response.data;
    
            if ('error' in responseData) return null;
    
            return responseData.task;
        } catch (error) {
            
            if ((error as AxiosError).response && (error as AxiosError).response!.status === 404) {
                return null; 
            }

            console.error('Error fetching task data:', error);
            toast({
                variant: 'destructive',
                title: 'Error Fetching Task Data',
                description: 'Failed to fetch task data. Please try again later.',
            });
            return null;
        }
    };

    function beforeEndDate(date: Date | string): boolean {
        const currentDate = dayjs();
        const givenDate = dayjs(date);
    
        return givenDate.isBefore(currentDate);
    }

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
                        if (task.status === TaskStateOptions.OPEN && beforeEndDate(task.endDate)) {
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

    if (loadingTasks) {
        return (
            <ProfileLoading />
        );
    }

    return (
		<div className="flex flex-col self-stretch pb-10 text-xl font-semibold tracking-normal leading-7">
			<div className="w-full bg-indigo-300 rounded-md min-h-[160px] max-md:max-w-full" />
            <div className='flex z-10 -mt-10 max-w-full px-4 md:px-20'>
                <ProfileCard {...userData as UserCard}/>
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