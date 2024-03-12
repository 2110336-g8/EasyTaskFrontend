import ViewTask from '@/components/task/detailTask';
import { Task, ViewTaskProps } from '@/types/task';
import dayjs from 'dayjs';
import React from 'react';
import { dateToString } from '@/utils/datetime';

export default async function TaskDetailPage() {
    const mocktaskRaw: Task = {
        _id: '123456789',
        image: '/cyberpunk.png',
        title: 'Design task cardddddddddd',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        startDate: new Date('2021-12-21'),
        endDate: new Date('2022-01-12'),
        location: 'Chatuchak, Bangkok',
        workers: 3,
        wages: 2000,
        category: 'Graphics',
        state: 'New',
        customerId: '1234567890',
        hiredWorkers: [],
    };

    const mocktask: ViewTaskProps = {
        taskId: mocktaskRaw._id,
        image: mocktaskRaw.image,
        title: mocktaskRaw.title,
        description: mocktaskRaw.description,
        startDate: dateToString(mocktaskRaw.startDate),
        endDate: dateToString(mocktaskRaw.endDate),
        location: mocktaskRaw.location,
        workers: mocktaskRaw.workers.toLocaleString(),
        wages: mocktaskRaw.wages.toLocaleString(),
        category: mocktaskRaw.category,
    };

    return (
        <div>
            <ViewTask {...mocktask} />
        </div>
    );
}
