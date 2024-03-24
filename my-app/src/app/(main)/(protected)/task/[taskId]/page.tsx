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
                        imageUrl: task.imageUrl,
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
