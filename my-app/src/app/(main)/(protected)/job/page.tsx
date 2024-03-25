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
import { getUserJobs } from '@/lib/getUserJobs';

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

export default function JobsList() {
    const router = useRouter();
    const [jobOfferList, setJobOfferList] = useState<AdsCardProps[]>([]);
    const [jobOnGoingList, setJobOnGoingList] = useState<AdsCardProps[]>([]);
    const [jobAppliedList, setJobAppliedList] = useState<AdsCardProps[]>([]);
    const [jobCompletedList, setJobCompletedList] = useState<AdsCardProps[]>(
        [],
    );
    const [jobRejectedList, setJobRejectedList] = useState<AdsCardProps[]>([]);
    const [jobNotProceedList, setJobNotProceedList] = useState<AdsCardProps[]>(
        [],
    );
    const userId: string | null = clientStorage.get().user._id;
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
                switch (jobStatus) {
                    case 'Applied':
                        setJobAppliedList(formattedJobsList);
                        break;
                    case 'Offering':
                        setJobOfferList(formattedJobsList);
                        break;
                    case 'Rejected':
                        setJobRejectedList(formattedJobsList);
                        break;
                    case 'Accepted':
                        setJobAppliedList(formattedJobsList);
                        break;
                    case 'NotProceed':
                        setJobNotProceedList(formattedJobsList);
                        break;
                    case 'Ongoing':
                        setJobOnGoingList(formattedJobsList);
                        break;
                    case 'Completed':
                        setJobCompletedList(formattedJobsList);
                        break;
                }
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
    useEffect(() => {
        // Call handleToggleClick for each type when the component is mounted
        fetchJobsFromStatus('Applied');
        fetchJobsFromStatus('Offering');
        fetchJobsFromStatus('Rejected');
        fetchJobsFromStatus('Accepted');
        fetchJobsFromStatus('NotProceed');
        fetchJobsFromStatus('Ongoing');
        fetchJobsFromStatus('Completed');
    }, []); // Empty dependency array ensures this effect runs only once
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
            <JobToggleList type='offer' adsList={jobOfferList} />
            <JobToggleList type='onGoing' adsList={jobOnGoingList} />
            <JobToggleList type='applied' adsList={jobAppliedList} />
            <JobToggleList type='completed' adsList={jobCompletedList} />
            <JobToggleList type='rejected' adsList={jobRejectedList} />
            <JobToggleList type='notProceed' adsList={jobNotProceedList} />
        </main>
    );
}
