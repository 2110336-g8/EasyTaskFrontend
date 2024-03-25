'use client';
import { useState } from 'react';
import { AdsCardProps } from '@/types/task';
import JobCard from './jobCard';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { getUserJobs } from '@/lib/getUserJobs';
import dayjs from 'dayjs';
import { toast } from '../ui/use-toast';

export default function JobToggleList({
    userId,
    type,
    adsList,
}: {
    userId: string;
    type: keyof typeof names;
    adsList: AdsCardProps[];
}) {
    const names = {
        Offering: 'Offering',
        OnGoing: 'Ongoing',
        Applied: 'Applied',
        Completed: 'Completed',
        Rejected: 'Rejected',
        NotProceed: 'Not Proceed',
    };

    const [isShow, setIsShow] = useState<boolean>(false);
    const [jobList, setJobList] = useState<AdsCardProps[]>([]);
    const [buttonFuncType, setButtonFuncType] = useState<string>(type);

    const fetchJobsFromStatus = async (jobStatus: string) => {
        try {
            const result = await getUserJobs({
                userId: userId,
                status: jobStatus,
            });
            if (result?.error) {
                console.error('Fetch Jobs failed:', result.error);
            } else if (result?.tasks) {
                const formattedJobsList: AdsCardProps[] = result.tasks.map(
                    task => ({
                        taskId: task._id,
                        imageUrl: task.imageUrl,
                        title: task.title,
                        status: task.status,
                        startDate: dayjs(task.startDate).format('DD MMM YYYY'),
                        endDate: dayjs(task.endDate).format('DD MMM YYYY'),
                        location: task.location?.name,
                        applications: task.workers.toLocaleString(),
                        hiredworkersNumber: task.hiredWorkers.length,
                        wages: task.wages.toLocaleString(),
                        category: task.category,
                    }),
                );

                setJobList(formattedJobsList);
                console.log('feteched', jobStatus);
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
    const handleToggleClick = (type: string) => {
        fetchJobsFromStatus(type);
        setIsShow(!isShow);
    };

    return (
        <div className='w-full flex flex-col gap-[20px]'>
            <div
                className='group flex w-full gap-[8px] cursor-pointer'
                onClick={() => handleToggleClick}
            >
                <button>
                    {isShow ? (
                        <ChevronDownIcon className='stroke-slate-500 stroke-2 w-[28px] h-[28px] group-hover:stroke-primary-500' />
                    ) : (
                        <ChevronRightIcon className='stroke-slate-500 stroke-2 w-[28px] h-[28px] group-hover:stroke-primary-500' />
                    )}
                </button>
                <h4 className='text-slate-500 group-hover:text-primary-500 group-hover:font-medium'>
                    {names[type]}
                </h4>
            </div>
            {isShow ? (
                adsList.length > 0 ? (
                    <div className='w-fit'>
                        <div className='flex flex-col gap-[24px] tablet:grid-cols-2 laptop:grid-cols-3 desktop-l:grid-cols-4 w-full gap-y-[24px] justify-between'>
                            {adsList.map((task, index) => (
                                <JobCard
                                    key={index}
                                    {...task}
                                    buttonFunc={type}
                                />
                            ))}
                        </div>
                    </div>
                ) : null
            ) : null}
        </div>
    );
}
