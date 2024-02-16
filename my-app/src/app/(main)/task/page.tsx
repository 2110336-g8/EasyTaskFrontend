'use client';
import dayjs from 'dayjs';
import TaskCard from '@/components/taskCard/taskCard';
import { AllTasksResponse, Task, TaskCardProps } from '@/types/task';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { getAllTasks } from '@/lib/getAllTasks';
import { useEffect, useState } from 'react';

export default function TaskList() {
    const [taskList, setTaskList] = useState<TaskCardProps[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            getAllTasks().then((taskListData: AllTasksResponse) => {
                const formattedTaskList: TaskCardProps[] =
                    taskListData.tasks.map(task => ({
                        taskId: task._id,
                        image: task.image,
                        title: task.title,
                        startDate: dayjs(task.startDate).format('DD MMM YYYY'),
                        endDate: dayjs(task.endDate).format('DD MMM YYYY'),
                        location: task.location,
                        workers: task.workers.toLocaleString(),
                        wages: task.wages.toLocaleString(),
                        category: task.category,
                    }));
                setTaskList(formattedTaskList);
            });
        };

        fetchData().catch(e => {
            console.error('Cannot fetch data. Error: ', e);
        });
    }, []);

    return (
        <main className='flex flex-col text-slate-500 font-medium text-[24px]/[32px] tracking-[.006em]'>
            <div className='mb-[24px]'>Recently posted</div>
            <div className='grid grid-cols-12 h-full w-full gap-y-[24px] gap-x-[16px] justify-items-center'>
                {taskList.map((task, index) => (
                    <TaskCard key={index} {...task} />
                ))}
            </div>
            <Pagination className='my-[40px]'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </main>
    );
}
