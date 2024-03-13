'use client';
import ViewTask from '@/components/task/detailTask';
import { toast } from '@/components/ui/use-toast';
import { getTaskDetail } from '@/lib/getTaskDetail';
import { Task, TaskDetailResponse, ViewTaskProps } from '@/types/task';
import { dateNow, formatDateDuration } from '@/utils/datetime';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

export default function TaskDetailPage({
    params,
}: {
    params: { taskId: string };
}) {
    // const mocktaskRaw: Task = {
    //     _id: '123456789',
    //     image: '/cyberpunk.png',
    //     title: 'Design task cardddddddddd',
    //     description:
    //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //     startDate: new Date('2021-12-21'),
    //     endDate: new Date('2022-01-12'),
    //     location: {
    //         name: 'Chatuchak, Bangkok',
    //         latitude: 13.725559,
    //         longitude: 13.725559,
    //     },
    //     workers: 3,
    //     wages: 2000,
    //     category: 'Graphics',
    //     status: 'Open',
    //     customerId: {
    //         _id: 'string',
    //         firstName: 'Sataporn',
    //         lastName: 'Kruatejah',
    //         email: 'string',
    //         phoneNumber: '083-366-6947',
    //         photoURL: 'string',
    //         bankId: 'string',
    //         bankAccNo: 'string',
    //     },
    //     hiredWorkers: [],
    //     createdAt: new Date('2021-11-30'),
    //     updatedAt: new Date('2021-11-30'),
    //     applicants: [],
    // };

    // const mocktask: ViewTaskProps = {
    //     taskId: mocktaskRaw._id,
    //     image: mocktaskRaw.image,
    //     title: mocktaskRaw.title,
    //     description: mocktaskRaw.description,
    //     startDate: dayjs(mocktaskRaw.startDate).format('DD MMM YYYY'),
    //     endDate: dayjs(mocktaskRaw.endDate).format('DD MMM YYYY'),
    //     location: mocktaskRaw.location,
    //     workers: mocktaskRaw.workers.toLocaleString(),
    //     wages: mocktaskRaw.wages.toLocaleString(),
    //     category: mocktaskRaw.category,
    //     posted: formatDateDuration(mocktaskRaw.createdAt, dateNow()),
    //     customer: {
    //         name:
    //             mocktaskRaw.customerId.firstName +
    //             ' ' +
    //             mocktaskRaw.customerId.lastName,
    //         image: mocktaskRaw.customerId.photoURL,
    //         phoneNumber: mocktaskRaw.customerId.phoneNumber,
    //     },
    // };

    const [task, setTask] = useState<ViewTaskProps>();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            getTaskDetail(params.taskId)
                .then((taskData: TaskDetailResponse) => {
                    const task: Task = taskData.task;
                    const formattedTask: ViewTaskProps = {
                        taskId: task._id,
                        title: task.title,
                        category: task.category,
                        image: task.image,
                        description: task.description,
                        location: task.location,
                        wages: task.wages.toLocaleString(),
                        startDate: dayjs(task.startDate).format('DD MMM YYYY'),
                        endDate: dayjs(task.endDate).format('DD MMM YYYY'),
                        workers: task.workers.toLocaleString(),
                        posted: formatDateDuration(task.createdAt, dateNow()),
                        customer: {
                            name:
                                task.customerId.firstName +
                                task.customerId.lastName,
                            image: task.customerId.photoURL,
                            phoneNumber: task.customerId.phoneNumber,
                        },
                    };
                    setTask(formattedTask);
                })
                .catch(e => {
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: 'There was a problem with your request.',
                    });
                    setError(e);
                    console.error('Cannot fetch data. Error: ', e);
                });
        };
        fetchData();
    }, []);

    return <div>{task ? <ViewTask {...task} /> : null}</div>;
}
