'use client';

import React, { useEffect, useState } from 'react';
import ViewAds from '@/components/ads/detailAds';
import { Worker, Task, ViewAdsProps, AdsDetailResponse } from '@/types/task';
import { undefined } from 'zod';
import { getAllAdsFromUser } from '@/lib/getAllAds';
import { otpVerification } from '@/lib/OTPVerification';
import Error from 'next/error';
import { dateFromString } from '@/utils/datetime';
import { clientStorage } from '@/utils/storageService';
import { useRouter } from 'next/navigation';

export default function AdsDetailPage({
    params,
}: {
    params: { adsId: string };
}) {
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

    const mockApplicants: Array<Worker> = [
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
        {
            status: 'In Progress',
            workerId: '1234567893',
        },
        {
            status: 'In Progress',
            workerId: '1234567894',
        },
        {
            status: 'In Progress',
            workerId: '1234567895',
        },
        {
            status: 'In Progress',
            workerId: '1234567896',
        },
        {
            status: 'In Progress',
            workerId: '1234567897',
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
        applicants: mockApplicants,
        createdAt: mockTaskRaw.createdAt,
    };

    const [data, setData] = useState<ViewAdsProps | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const userId: string | null = clientStorage.get().user._id;
        if (!userId) {
            router.push('/login');
        }

        getAllAdsFromUser(params.adsId)
            .then(taskResponse => {
                const task = taskResponse[params.adsId];
                const props: ViewAdsProps = {
                    taskId: task._id,
                    title: task.title,
                    description: task.description,
                    image: mockTaskRaw.image, // todo: What is imageKeys?
                    category: task.category,
                    wages: task.wages,
                    workers: task.workers,
                    location: task.location,
                    startDate: dateFromString(task.startDate),
                    endDate: dateFromString(task.endDate),
                    applicants: task.applicants.map(worker => {
                        worker.status;
                        worker.userId;
                        // createdA dateFromString()
                    }),
                    createdAt: dateFromString(task.createdAt),
                };
                setData(props);
                setIsLoading(false);
            })
            .catch(e => {
                setError(e.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>{data ? <ViewAds {...data} /> : <h1>{error}</h1>}</div>;
}
