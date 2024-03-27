'use client';
import ViewTask from '@/components/task/taskDetail/detailTask';
import { toast } from '@/components/ui/use-toast';
import { getTaskDetail } from '@/lib/getTaskDetail';
import {
    AdsDetailResponse,
    Applicant,
    Worker,
    JobDetailResponse,
    Task,
    ViewTaskProps,
    ViewJobProps,
    ViewAdsProps,
    ApplicantStatusOptions,
} from '@/types/task';
import { User } from '@/types/user';
import { dateNow, formatDateDuration } from '@/utils/datetime';
import { clientStorage } from '@/utils/storageService';
import { formatPhoneNumber } from '@/utils/utils';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

export default function TaskDetailPage({
    params,
}: {
    params: { taskId: string };
}) {
    const [task, setTask] = useState<ViewJobProps | ViewTaskProps>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const userId: string | null = clientStorage.get().user._id;
        const fetchData = async () => {
            getTaskDetail(params.taskId)
                .then((taskData: JobDetailResponse | AdsDetailResponse) => {
                    const task: Task = taskData.task;
                    const formattedTask: ViewTaskProps = {
                        viewType: userId == task.customerId ? 'ads' : 'job',
                        taskId: task._id,
                        title: task.title,
                        category: task.category,
                        imageUrl: task.imageUrl,
                        description: task.description,
                        location: task.location,
                        wages: task.wages.toLocaleString(),
                        startDate: dayjs(task.startDate),
                        endDate: dayjs(task.endDate),
                        workers: task.workers.toLocaleString(),
                        posted: dayjs(task.createdAt.toString()).fromNow().toString(),
                        status: task.status,
                    };
                    // console.log(taskData.customerInfo)
                    if ('customerInfo' in taskData) {
                        (formattedTask as ViewJobProps).customer = {
                            _id: taskData.customerInfo._id,
                            name:
                                taskData.customerInfo.firstName +
                                ' ' +
                                taskData.customerInfo.lastName,
                            image: taskData.customerInfo.imageUrl,
                            phoneNumber: formatPhoneNumber(
                                taskData.customerInfo.phoneNumber || '',
                            ),
                        };
                        (formattedTask as ViewJobProps).jobStatus =
                            taskData.status;
                    }
                    if ('applicantsInfo' in taskData) {
                        (formattedTask as ViewAdsProps).applicants =
                            taskData.applicantsInfo?.map(
                                (applicant: Applicant | User) => ({
                                    _id: (applicant as User)._id,
                                    name:
                                        (applicant as User).firstName +
                                        ' ' +
                                        (applicant as User).lastName,
                                    image: (applicant as User).imageUrl,
                                    phoneNumber: formatPhoneNumber(
                                        (applicant as User).phoneNumber || '',
                                    ),
                                    status: (applicant as Applicant).status,
                                }),
                            );
                        (formattedTask as ViewAdsProps).pendingApplicants = (
                            formattedTask as ViewAdsProps
                        ).applicants?.filter(
                            applicant =>
                                applicant.status ===
                                ApplicantStatusOptions.PENDING,
                        );
                        (formattedTask as ViewAdsProps).acceptApplicants = (
                            formattedTask as ViewAdsProps
                        ).applicants?.filter(
                            applicant =>
                                applicant.status ===
                                ApplicantStatusOptions.ACCEPTED,
                        );
                        (formattedTask as ViewAdsProps).offeringApplicants = (
                            formattedTask as ViewAdsProps
                        ).applicants?.filter(
                            applicant =>
                                applicant.status ===
                                ApplicantStatusOptions.OFFERING,
                        );
                    }
                    if ('hiredWorkersInfo' in taskData) {
                        (formattedTask as ViewAdsProps).hiredWorkers =
                            taskData.hiredWorkersInfo?.map(
                                (worker: Worker | User) => ({
                                    _id: (worker as User)._id,
                                    name:
                                        (worker as User).firstName +
                                        ' ' +
                                        (worker as User).lastName,
                                    image: (worker as User).imageUrl,
                                    phoneNumber: formatPhoneNumber(
                                        (worker as User).phoneNumber || '',
                                    ),
                                    status: (worker as Worker).status,
                                }),
                            );
                    }

                    setTask(formattedTask);
                    setIsLoading(false);
                })
                .catch(e => {
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: 'There was a problem with your request.',
                    });
                    setError(e);
                    setIsLoading(false);
                    console.error('Cannot fetch data. Error: ', e);
                });
        };
        fetchData();
    }, [isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {task ? (
                <ViewTask props={task} setIsLoading={setIsLoading} />
            ) : null}
        </div>
    );
}
