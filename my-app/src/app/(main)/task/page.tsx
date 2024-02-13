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

export default async function TaskList() {
    const taskListData: AllTasksResponse = await getAllTasks();
    // console.log(taskListData)

    const taskList: TaskCardProps[] = taskListData.tasks.map(task => ({
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

    // const mocktaskRawList: Task[] = [];
    // for (let i = 0; i < 7; i++) {
    //     mocktaskRawList.push({
    //         _id: `task${i}`,
    //         image: '/cyberpunk.png',
    //         title: `Design task card ${i}`,
    //         startDate: new Date(`2022-02-${10 + i}`), // Adjust start date accordingly
    //         endDate: new Date(`2022-03-${20 + i}`), // Adjust end date accordingly
    //         location: `Location ${i}`,
    //         workers: i + 1,
    //         wages: (i + 1) * 1000,
    //         category: `Category ${i}`,
    //         state: 'New',
    //         customerId: `customer${i}`,
    //         hiredWorkers: [],
    //     });
    // }

    // const mocktaskList: TaskCardProps[] = mocktaskRawList.map(mocktaskRaw => ({
    //     taskId: mocktaskRaw._id,
    //     image: mocktaskRaw.image,
    //     title: mocktaskRaw.title,
    //     startDate: dayjs(mocktaskRaw.startDate).format('DD MMM YYYY'),
    //     endDate: dayjs(mocktaskRaw.endDate).format('DD MMM YYYY'),
    //     location: mocktaskRaw.location,
    //     workers: mocktaskRaw.workers,
    //     wages: mocktaskRaw.wages.toLocaleString(),
    //     category: mocktaskRaw.category,
    // }));

    // const mocktask2: TaskCardProps = {
    //     taskId: '65c7cd3482ab1ae2e2dccaaa',
    //     // image: '/cyberpunk.png',
    //     title: 'Design task cardddddddddddddddddddddddddddddddddddddd',
    //     startDate: '21 Dec 2021',
    //     endDate: '12 Jan 2022',
    //     // location: 'Chatuchak, Bangkok',
    //     workers: 3,
    //     wages: '2,000',
    //     // category: 'General',
    // };

    return (
        <main className='flex flex-col text-slate-500 font-medium text-[24px]/[32px] tracking-[.006em]'>
            <div className='mb-[24px]'>Recently posted</div>
            <div className='grid grid-cols-12 h-full w-full gap-y-[24px] gap-x-[16px] justify-items-center'>
                {/* <TaskCard {...mocktask2}></TaskCard>
                {mocktaskList.map((mocktask, index) => (
                    <TaskCard key={index} {...mocktask} />
                ))} */}
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
