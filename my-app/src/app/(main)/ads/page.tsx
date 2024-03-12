'use client';
import { useEffect, useState } from 'react';
import { AdsCardProps } from '@/types/task';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import AdsToggleList from '@/components/adsList/adsToggleList';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { toast } from '@/components/ui/use-toast';
import { clientStorage } from '@/utils/storageService';

export type WageRange = [number | null, number | null];

const mockList: AdsCardProps[] = [
    {
        taskId: 'someTaskId',
        title: 'someTitle',
        category: 'someCategory',
        location: 'someLocation',
        wages: '5,000,00',
        startDate: 'someStartDate',
        applications: '1,000',
    },
    {
        taskId: 'someTaskId',
        title: 'someTitle',
        category: 'someCategory',
        location: 'someLocation',
        wages: '1,000',
        startDate: 'someStartDate',
        applications: '1,000',
    },
    {
        taskId: 'someTaskId',
        title: 'someTitle',
        category: 'someCategory',
        location: 'someLocation',
        wages: '1,000',
        startDate: 'someStartDate',
        applications: '1,000',
    },
    {
        taskId: 'someTaskId',
        title: 'someTitle',
        category: 'someCategory',
        location: 'someLocation',
        wages: '1,000',
        startDate: 'someStartDate',
        applications: '1,000',
    },
];

export default function AdsList() {
    const router = useRouter();
    const [adsPayList, setAdsPayList] = useState<AdsCardProps[]>([]);
    const [adsOpenList, setAdsOpenList] = useState<AdsCardProps[]>([]);
    const [adsWorkList, setAdsWorkList] = useState<AdsCardProps[]>([]);
    const [adsClosedList, setAdsClosedList] = useState<AdsCardProps[]>([]);

    useEffect(() => {
        const userId: string | null = clientStorage.get().user._id;
        if (!userId){
            router.push("/login")
        }
        console.log(userId)
        const fetchAdsList = async () => {
            // getUserAds({
            //     userId,
            // }).then((adsListData: GetAdsResponse) => {
            // const formattedAdsList: AdsCardProps[] = adsListData.tasks.map(
            //     task => ({
            //         taskId: task._id,
            //         image: task.image,
            //         title: task.title,
            //         startDate: dayjs(task.startDate).format('DD MMM YYYY'),
            //         location: task.location?.name,
            //         applications: task.workers.toLocaleString(),
            //         wages: task.wages.toLocaleString(),
            //         category: task.category,
            //     }),
            // );
            // logic fillter
            setAdsPayList(mockList);
            setAdsOpenList(mockList);
            setAdsWorkList(mockList);
            setAdsClosedList(mockList);
            //     })
            //     .catch(e => {
            //         toast({
            //             variant: 'destructive',
            //             title: 'Uh oh! Something went wrong.',
            //             description: 'There was a problem with your request.',
            //         });
            //         console.error('Error fetching ads list', e);
            //     });
        };
        fetchAdsList();
    }, []);

    return (
        <main className='flex flex-col gap-[40px] items-center '>
            <div className='w-full flex justify-between'>
                <h1>Your Job Advertisements</h1>
                <Button
                    onClick={() => {
                        router.push('/task/create');
                    }}
                    className='gap-x-[10px]'
                >
                    <PlusIcon />
                    Create New Ads
                </Button>
            </div>
            <AdsToggleList type='pay' adsList={adsPayList} />
            <AdsToggleList type='open' adsList={adsOpenList} />
            <AdsToggleList type='working' adsList={adsWorkList} />
            <AdsToggleList type='closed' adsList={adsClosedList} />
        </main>
    );
}