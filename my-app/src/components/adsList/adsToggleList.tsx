import { useEffect, useState } from 'react';
import { AdsCardProps, Task } from '@/types/task';
import AdsCard from '@/components/adsList/adsCard';
import {
    ChevronDownIcon,
    ChevronRightIcon,
    AlertTriangleIcon,
} from 'lucide-react';
import { getUserAds } from '@/lib/getUserAds';
import { toast } from '../ui/use-toast';
import dayjs from 'dayjs';

export default function AdsToggleList({
    type,
    userId,
}: {
    type: keyof typeof names;
    userId: string;
}) {
    const names = {
        InProgress: 'In Progress',
        Open: 'Open for Apply',
        Completed: 'Completed',
        Dismissed: 'Dismissed',
    };

    const [isShow, setIsShow] = useState<boolean>(false);
    const [buttonFuncType, setButtonFuncType] = useState<string>(type);
    const [adsList, setadsList] = useState<AdsCardProps[]>([]);

    // useEffect(() => {
    //     if (managing) {
    //         setButtonFuncType('managing');
    //     } else {
    //         setButtonFuncType(type);
    //     }
    // }, [managing, type]);
    const fetchJobsFromStatus = async (adsStatus: string) => {
        try {
            const result = await getUserAds({
                userId: userId,
                status: adsStatus,
            });

            if (result?.error) {
                console.error(
                    `Fetch Jobs for ${adsStatus} failed:`,
                    result.error,
                );
            } else if (result?.tasks) {
                const formattedAdsList: AdsCardProps[] = result.tasks.map(
                    task => ({
                        taskId: task._id,
                        imageUrl: task.imageUrl,
                        title: task.title,
                        status: adsStatus,
                        startDate: dayjs(task.startDate).format('DD MMM YYYY'),
                        endDate: dayjs(task.endDate).format('DD MMM YYYY'),
                        location: task.location?.name,
                        applications: task.applicants.length.toLocaleString(),
                        hiredworkersNumber: task.hiredWorkers.length,
                        wages: task.wages.toLocaleString(),
                        category: task.category,
                    }),
                );
                setadsList(formattedAdsList);
                console.log('fetched', adsStatus);
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'Please try again later.',
            });
            console.error('Error fetching ads list', error);
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
                onClick={() => handleToggleClick(type)}
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
                            {type === 'Open' && (
                                <div className='bg-error-100 gap-[8px] px-[8px] py-[10px] rounded-[6px] flex'>
                                    <AlertTriangleIcon className='w-[24px] h-[24px] text-error-500' />
                                    <p className='text-error-500'>
                                        Please select candidate before the job
                                        start date. If not, it will be
                                        automatically closed after the job start
                                        within 1 week.
                                    </p>
                                </div>
                            )}
                            {adsList.map((task, index) => (
                                <AdsCard
                                    key={index}
                                    props={task}
                                    // buttonFunc={buttonFuncType}
                                />
                            ))}
                        </div>
                    </div>
                ) : null
            ) : null}
        </div>
    );
}
