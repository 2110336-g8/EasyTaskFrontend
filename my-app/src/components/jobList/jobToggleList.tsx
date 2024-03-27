'use client';
import { useState } from 'react';
import { AdsCardProps, JobsCardProps, UserJobsProps } from '@/types/task';
import JobCard from './jobCard';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { getUserJobs } from '@/lib/getUserJobs';
import dayjs from 'dayjs';
import { toast } from '../ui/use-toast';

export default function JobToggleList({
    userId,
    type,
    // adsList,
}: {
    userId: string;
    type: keyof typeof names;
    // adsList: AdsCardProps[];
}) {
    const names: { [key: string]: string[] } = {
        Applied: ['Pending'],
        Offering: ['Offering'],
        Rejected: ['Rejected'],
        Accepted: ['Accepted'],
        'Not Proceed': ['NotProceed'],
        Ongoing: ['InProgress', 'Submitted', 'Revising', 'Resubmitted'],
        Completed: ['Completed'],
    };
    console.log(names[type]);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [jobList, setJobList] = useState<JobsCardProps[]>([]);
    // const [buttonFuncType, setButtonFuncType] = useState<string>(type);

    const fetchJobsFromStatus = async (jobStatusArray: string[]) => {
        try {
            if (!Array.isArray(jobStatusArray)) {
                console.error('jobStatusArray is not an array');
                return;
            }
            const combinedJobList: JobsCardProps[] = [];

            for (const jobStatus of jobStatusArray) {
                const result = await getUserJobs({
                    userId: userId,
                    status: jobStatus,
                });

                if (result?.error) {
                    console.error(
                        `Fetch Jobs for ${jobStatus} failed:`,
                        result.error,
                    );
                } else if (result?.enrolled_tasks) {
                    const taskStatus = result.enrolled_tasks[0].status;
                    const formattedJobsList: JobsCardProps[] =
                        result.enrolled_tasks[0].tasks.map(task => ({
                            taskId: task.taskId,
                            imageUrl: task.imageUrl,
                            title: task.title,
                            startDate: dayjs(task.startDate).format(
                                'DD MMM YYYY',
                            ),
                            endDate: dayjs(task.endDate).format('DD MMM YYYY'),
                            locationName: task.locationName,
                            applicationsNumber: task.applicationsNumber,
                            wages: task.wages.toLocaleString(),
                            category: task.category,
                            taskStatus: taskStatus,
                        }));
                    combinedJobList.push(...formattedJobsList);
                    console.log('fetched', jobStatus);
                }
            }

            if (combinedJobList.length > 0) {
                setJobList(combinedJobList);
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
            });
            console.error('Error fetching jobs list', error);
        }
    };

    const handleToggleClick = (types: string[]) => {
        fetchJobsFromStatus(types);
        setIsShow(!isShow);
    };

    return (
        <div className='w-full flex flex-col gap-[20px]'>
            <div
                className='group flex w-full gap-[8px] cursor-pointer'
                onClick={() => handleToggleClick(names[type])}
            >
                <button>
                    {isShow ? (
                        <ChevronDownIcon className='stroke-slate-500 stroke-2 w-[28px] h-[28px] group-hover:stroke-primary-500' />
                    ) : (
                        <ChevronRightIcon className='stroke-slate-500 stroke-2 w-[28px] h-[28px] group-hover:stroke-primary-500' />
                    )}
                </button>
                <h4 className='text-slate-500 group-hover:text-primary-500 group-hover:font-medium'>
                    {type}
                </h4>
            </div>
            {isShow ? (
                jobList.length > 0 ? (
                    <div className='w-fit'>
                        <div className='flex flex-col gap-[24px] tablet:grid-cols-2 laptop:grid-cols-3 desktop-l:grid-cols-4 w-full gap-y-[24px] justify-between'>
                            {jobList.map((task, index) => (
                                <JobCard key={index} {...task} />
                            ))}
                        </div>
                    </div>
                ) : null
            ) : null}
        </div>
    );
}
