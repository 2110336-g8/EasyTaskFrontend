'use client';
import { useEffect, useState } from 'react';
import {
    AdsCardProps,
    GetUserAdsResponse,
    TaskStateOptions,
} from '@/types/task';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { toast } from '@/components/ui/use-toast';
import { clientStorage } from '@/utils/storageService';
import { getUserAds } from '@/lib/getUserAds';
import JobToggleList from '@/components/jobList/jobToggleList';

export type WageRange = [number | null, number | null];

// const mockList: AdsCardProps[] = [
//     {
//         taskId: 'someTaskId',
//         title: 'someTitle',
//         category: 'someCategory',
//         location: 'someLocation',
//         wages: '5,000,000',
//         startDate: 'someStartDate',
//         applications: '1,000',
//     },
//     {
//         taskId: 'someTaskId',
//         title: 'someTitle',
//         category: 'someCategory',
//         location: 'someLocation',
//         wages: '1,000',
//         startDate: 'someStartDate',
//         applications: '1,000',
//     },
//     {
//         taskId: 'someTaskId',
//         title: 'someTitle',
//         category: 'someCategory',
//         location: 'someLocation',
//         wages: '1,000',
//         startDate: 'someStartDate',
//         applications: '1,000',
//     },
//     {
//         taskId: 'someTaskId',
//         title: 'someTitle',
//         category: 'someCategory',
//         location: 'someLocation',
//         wages: '1,000',
//         startDate: 'someStartDate',
//         applications: '1,000',
//     },
// ];

export default function AdsList() {
    const router = useRouter();
    const [jobOfferList, setJobOfferList] = useState<AdsCardProps[]>([]);
    const [jobOnGoingList, setJobOnGoingList] = useState<AdsCardProps[]>([]);
    const [jobAppliedList, setJobAppliedList] = useState<AdsCardProps[]>([]);
    const [jobCompletedList, setJobCompletedList] = useState<AdsCardProps[]>([]);
    const [jobRejectedList, setRejectedList] = useState<AdsCardProps[]>([]);
    const [isManaging, setIsManaging] = useState(false);

    useEffect(() => {
        const userId: string | null = clientStorage.get().user._id;
        if (!userId) {
            router.push('/login');
        }
        // console.log(userId);
        // const userId: string | null = '65eff56288030343046799b0';
        const fetchAdsList = async () => {
            getUserAds({
                userId,
            })
                .then((jobListData: GetUserAdsResponse) => {
                    const formattedJobList: AdsCardProps[] =
                        jobListData.tasks.map(task => ({
                            taskId: task._id,
                            image: task.image,
                            title: task.title,
                            status: task.status,
                            startDate: dayjs(task.startDate).format(
                                'DD MMM YYYY',
                            ),
                            endDate: dayjs(task.endDate).format('DD MMM YYYY'),
                            location: task.location?.name,
                            applications: task.workers.toLocaleString(),
                            wages: task.wages.toLocaleString(),
                            category: task.category,
                        }));
                    console.log(jobListData);

                    setJobOfferList(
                        formattedJobList.filter(
                            task => task.status == TaskStateOptions.COMPLETED, //edit here after backend done the state
                        ),
                    );
                    setJobOnGoingList(
                        formattedJobList.filter(
                            task => task.status == TaskStateOptions.OPEN,
                        ),
                    );
                    setJobAppliedList(
                        formattedJobList.filter(
                            task => task.status == TaskStateOptions.INPROGRESS,
                        ),
                    );
                    setJobCompletedList(
                        formattedJobList.filter(
                            task => task.status == TaskStateOptions.CLOSED,
                        ),
                    );
                    setRejectedList(
                        formattedJobList.filter(
                            task => task.status == TaskStateOptions.CLOSED,
                        ),
                    );
                })
                .catch(e => {
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: 'There was a problem with your request.',
                    });
                    console.error('Error fetching ads list', e);
                });
        };
        fetchAdsList();
    }, []);

    // Function to set isManaging to true
    const handleManage = () => {
        setIsManaging(true);
    };

    return (
        <main className='flex flex-col gap-[40px] items-center '>
            <div className='w-full flex justify-between'>
                <h1>Your Job</h1>
                {/* <div className='flex gap-[16px]'>
                    <Button
                        onClick={() => {
                            router.push('/task/create');
                        }}
                        className='gap-x-[10px] text-primary-500 bg-slate-50 border border-primary-500 border-[2px] hover:bg-slate-200'
                    >
                        <PlusIcon />
                        Create
                    </Button>
                    <Button
                        onClick={handleManage}
                        className='gap-x-[10px] text-primary-500 bg-slate-50 border border-primary-500 border-[2px]'
                    >
                        <PenSquareIcon />
                        Manage
                    </Button>
                </div> */}
            </div>
            <JobToggleList
                type='offer'
                adsList={jobOfferList}
                managing={isManaging}
            />
            <JobToggleList
                type='onGoing'
                adsList={jobOnGoingList}
                managing={isManaging}
            />
            <JobToggleList
                type='applied'
                adsList={jobAppliedList}
                managing={isManaging}
            />
            <JobToggleList
                type='completed'
                adsList={jobCompletedList}
                managing={isManaging}
            />
            <JobToggleList
                type='rejected'
                adsList={jobRejectedList}
                managing={isManaging}
            />
        </main>
    );
}
