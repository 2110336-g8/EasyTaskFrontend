'use client';

import TaskCard from '@/components/taskCard/taskCard';
import { TaskCardProps } from '@/types/task';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export default function TaskList() {
    const mocktask: TaskCardProps = {
        taskId: "65c7cd3482ab1ae2e2dccaaa",
        // image: '/mocktask.png',
        title: 'Design task cardddddddddddddddddddddddddddddddddddddd',
        startDate: '21 Dec 2021',
        endDate: '12 Jan 2022',
        location: 'Chatuchak, Bangkok',
        workers: 3,
        wages: 2000,
        category: 'General',
    };
    const mocktask2: TaskCardProps = {
        taskId: "65c7cd3482ab1ae2e2dccaaa",
        image: '/mocktask.png',
        title: 'Design task cardddddddddddddddddddddddddddddddddddddd',
        startDate: '21 Dec 2021',
        endDate: '12 Jan 2022',
        // location: 'Chatuchak, Bangkok',
        workers: 3,
        wages: 2000,
        // category: 'General',
    };

    return (
        <main className='flex flex-col text-slate-500 font-medium text-[24px]/[32px] tracking-[.006em]'>
            <div className='mb-[24px]'>Recently posted</div>
            <div className='grid grid-cols-12 h-full w-full gap-y-[24px] gap-x-[16px] justify-items-center'>
                <TaskCard {...mocktask}></TaskCard>
                <TaskCard {...mocktask2}></TaskCard>
                <TaskCard {...mocktask}></TaskCard>
                <TaskCard {...mocktask}></TaskCard>
                <TaskCard {...mocktask}></TaskCard>
                <TaskCard {...mocktask}></TaskCard>
                <TaskCard {...mocktask}></TaskCard>
                <TaskCard {...mocktask}></TaskCard>
            </div>
            <Pagination className='my-[40px]'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href='#' />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href='#'>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href='#' />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </main>
    );
}
