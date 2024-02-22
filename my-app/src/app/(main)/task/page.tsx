'use client';
import dayjs from 'dayjs';
import TaskCard from '@/components/taskCard/taskCard';
import PaginationContainer from '@/components/pagination/paginationContainer';
import { AllTasksResponse, TaskCardProps } from '@/types/task';
import { getAllTasks } from '@/lib/getAllTasks';
import { useEffect, useState } from 'react';

export default function TaskList() {
    const limit = 8;
    const [taskList, setTaskList] = useState<TaskCardProps[]>([]);
    const [page, setPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            // console.log('page', page);
            getAllTasks({ page, limit }).then(
                (taskListData: AllTasksResponse) => {
                    // console.log(taskListData)
                    const formattedTaskList: TaskCardProps[] =
                        taskListData.tasks.map(task => ({
                            taskId: task._id,
                            image: task.image,
                            title: task.title,
                            startDate: dayjs(task.startDate).format(
                                'DD MMM YYYY',
                            ),
                            endDate: dayjs(task.endDate).format('DD MMM YYYY'),
                            location: task.location,
                            workers: task.workers.toLocaleString(),
                            wages: task.wages.toLocaleString(),
                            category: task.category,
                        }));
                    setTaskList(formattedTaskList);
                    setTotalPageCount(
                        Math.ceil(taskListData.count/ limit || 1),
                    );
                },
            );
        };

        fetchData().catch(e => {
            console.error('Cannot fetch data. Error: ', e);
        });
    }, [page]);

    return (
        <main className='flex flex-col'>
            <h4 className='text-slate-500 mb-[24px]'>Recently posted</h4>
            <div className='grid grid-cols-12 h-full w-full gap-y-[24px] gap-x-[16px] justify-items-center'>
                {taskList.map((task, index) => (
                    <TaskCard key={index} {...task} />
                ))}
            </div>
            <PaginationContainer
                setPage={setPage}
                totalPageCount={totalPageCount}
                currentPage={page}
            />
        </main>
    );
}
