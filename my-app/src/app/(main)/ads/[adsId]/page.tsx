'use client';

import React, { useEffect, useState } from 'react';
import ViewAds from '@/components/ads/detailAds';
import { ViewAdsProps, TaskKV, Applicant } from '@/types/task';
import { clientStorage } from '@/utils/storageService';
import { useRouter } from 'next/navigation';
import { getUserAds } from '@/lib/getUserAds';

export default function AdsDetailPage({
    params,
}: {
    params: { adsId: string };
}) {
    const mockTaskRaw = {
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
        hiredWorkers: [],
        createdAt: new Date('2021-11-30'),
        updatedAt: new Date('2021-11-30'),
    };

    const mockApplicants: Array<Applicant> = [];

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
        // const userId: string | null = clientStorage.get().user._id;
        const userId: string | null = '65eff56288030343046799b0';
        if (!userId) {
            router.push('/login');
        }

        getUserAds({ userId })
            .then(taskResponse => {
                let taskKV: TaskKV = {};
                for (const task of taskResponse.tasks) {
                    taskKV[task._id] = task;
                }

                const task = taskKV[params.adsId];

                const props: ViewAdsProps = {
                    taskId: task._id,
                    title: task.title,
                    description: task.description,
                    image: mockTaskRaw.image, // todo: What is imageKeys?
                    category: task.category,
                    wages: task.wages,
                    workers: task.workers,
                    location: task.location,
                    startDate: task.startDate,
                    endDate: task.endDate,
                    applicants: task.applicants,
                    createdAt: task.createdAt,
                };
                setData(props);
                setIsLoading(false);
            })
            .catch(e => {
                setError('Unable to get details of this ad!');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>{data ? <ViewAds {...data} /> : <h1>{error}</h1>}</div>;
}
