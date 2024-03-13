'use client';
import dayjs from 'dayjs';
import TaskCard from '@/components/taskList/taskCard';
import PaginationContainer from '@/components/pagination/paginationContainer';
import { AllTasksResponse, TaskCardProps } from '@/types/task';
import { getAllTasks } from '@/lib/getAllTasks';
import { useEffect, useState } from 'react';
import SearchBar from '@/components/ui/searchbar';
import { toast } from '@/components/ui/use-toast';
import FilterTaskList from '@/components/taskList/filter';

export type WageRange = [number | null, number | null];

export default function TaskList() {
    const limit = 8;
    const [searchName, setSearchName] = useState<string | null>(null);
    const [taskList, setTaskList] = useState<TaskCardProps[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPageCount, setTotalPageCount] = useState<number>(1);
    const [categoryFilters, setCategoryFilters] = useState<Set<string>>(
        new Set(),
    );
    const [isIndividual, setIndividual] = useState<boolean | null>(null);
    const [wageRangeFilters, setWageRangeFilters] = useState<Set<WageRange>>(
        new Set(),
    );

    const updateCategoryFilters = (value: string) => {
        const newFilters = new Set(categoryFilters);
        if (newFilters.has(value)) {
            newFilters.delete(value);
        } else {
            newFilters.add(value);
        }
        setCategoryFilters(newFilters);
        setPage(1);
    };

    const updateWageRangeFilters = (value: WageRange) => {
        const newFilters = new Set(wageRangeFilters);
        if (newFilters.has(value)) {
            newFilters.delete(value);
        } else {
            newFilters.add(value);
        }
        setWageRangeFilters(newFilters);
        setPage(1);
    };

    const updateIndividualFilter = (newIndiv: boolean) => {
        if (isIndividual === null) {
            setIndividual(newIndiv);
        } else {
            if (newIndiv === isIndividual) {
                setIndividual(null);
            } else {
                setIndividual(newIndiv);
            }
        }
        setPage(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            console.log('page', page);
            console.log('searchName', searchName);
            console.log('categoryFilters', categoryFilters);
            console.log('isIndividual', isIndividual);
            console.log('wageRangeFilters', wageRangeFilters);
            getAllTasks({
                page,
                limit,
                ...(searchName !== null && { name: searchName }),
                ...(categoryFilters.size > 0 && {
                    categoryFilters: Array.from(categoryFilters),
                }),
                ...(isIndividual !== null && { isIndividual }),
                ...(wageRangeFilters.size > 0 && {
                    wageRangeFilters: Array.from(wageRangeFilters),
                }),
            })
                .then((taskListData: AllTasksResponse) => {
                    console.log(taskListData);
                    const formattedTaskList: TaskCardProps[] =
                        taskListData.tasks.map(task => ({
                            taskId: task._id,
                            imageUrl: task.imageUrls?.[0],
                            title: task.title,
                            startDate: dayjs(task.startDate).format(
                                'DD MMM YYYY',
                            ),
                            endDate: dayjs(task.endDate).format('DD MMM YYYY'),
                            location: task.location?.name,
                            workers: task.workers.toLocaleString(),
                            wages: task.wages.toLocaleString(),
                            category: task.category,
                        }));
                    setTaskList(formattedTaskList);
                    setTotalPageCount(
                        Math.ceil(taskListData.count / limit || 1),
                    );
                })
                .catch(e => {
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: 'There was a problem with your request.',
                    });
                    console.error('Cannot fetch data. Error: ', e);
                });
        };
        fetchData();
    }, [page, searchName, categoryFilters, isIndividual, wageRangeFilters]);

    return (
        <main className='flex flex-col gap-[40px] items-center '>
            <SearchBar updateSearchName={setSearchName} />
            <FilterTaskList
                updateCategoryFilters={updateCategoryFilters}
                updateIndividualFilter={updateIndividualFilter}
                updateWageRangeFilters={updateWageRangeFilters}
            />
            {taskList.length > 0 ? (
                <div className='w-fit'>
                    <h4 className='text-slate-500 mb-[24px]'>
                        Recently posted
                    </h4>
                    <div className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop-l:grid-cols-4 h-fit w-fit gap-x-[16px] gap-y-[24px] justify-between'>
                        {taskList.map((task, index) => (
                            <TaskCard key={index} {...task} />
                        ))}
                    </div>
                    <PaginationContainer
                        setPage={setPage}
                        totalPageCount={totalPageCount}
                        currentPage={page}
                    />
                </div>
            ) : (
                <h4 className='w-fit text-slate-500 mb-[24px]'>
                    There is no matched task
                </h4>
            )}
        </main>
    );
}
