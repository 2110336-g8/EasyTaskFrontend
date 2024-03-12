import React from 'react';
import ViewAds from '@/components/ads/detailAds';
import { Worker, Task, ViewAdsProps } from '@/types/task';
import { undefined } from 'zod';

export default async function AdsDetailPage() {
    const mockTaskRaw: Task = {
        _id: '123456789',
        image: '/cyberpunk.png',
        title: 'Design task card with very long project name',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ' +
            'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ' +
            'in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa ' +
            'qui officia deserunt mollit anim id est laborum.',
        startDate: new Date('2021-11-21'),
        endDate: new Date('2023-01-12'),
        location: {
            name: 'Chatuchak, Bangkok',
            latitude: 13,
            longitude: 100,
        },
        workers: 3,
        wages: 2000,
        category: 'Graphics',
        state: 'Open',
        customerId: '1234567890',
        hiredWorkers: [],
        createdAt: new Date('2021-11-30'),
        updatedAt: new Date('2021-11-30'),
    };

    // const mockAds: ViewAdsProps = {
    //     applications: '',
    //     category: mockTaskRaw.category,
    //     image: mockTaskRaw.image,
    //     location: 'location',
    //     startDate: dayjs(mockTaskRaw.startDate).format('DD MMM YYYY'),
    //     endDate: dayjs(mockTaskRaw.startDate).format('DD MMM YYYY'),
    //     taskId: mockTaskRaw._id,
    //     title: mockTaskRaw.title,
    //     wages: mockTaskRaw.wages.toString(),
    // };

    const mockWorkers: Array<Worker> = [
        {
            status: 'In Progress',
            workerId: '1234567890',
        },
        {
            status: 'In Progress',
            workerId: '1234567891',
        },
        {
            status: 'In Progress',
            workerId: '1234567892',
        },
    ];

    const mockAds: ViewAdsProps = {
        taskId: mockTaskRaw._id,
        title: mockTaskRaw.title,
        description: mockTaskRaw.description,
        image: mockTaskRaw.image,
        category: mockTaskRaw.category,
        wages: mockTaskRaw.wages,
        workers: mockTaskRaw.workers,
        location: mockTaskRaw.location,
        startDate: mockTaskRaw.startDate,
        endDate: mockTaskRaw.endDate,
        applicants: mockWorkers,
        createdAt: mockTaskRaw.createdAt,
    };

    return (
        <div>
            <ViewAds {...mockAds} />
        </div>
    );
}
