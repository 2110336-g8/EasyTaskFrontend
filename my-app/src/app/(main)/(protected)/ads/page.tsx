'use client';
import { useEffect, useState } from 'react';
import {
    AdsCardProps,
    AdsStateOptions,
    GetUserAdsResponse,
    TaskStateOptions,
} from '@/types/task';
import { Button } from '@/components/ui/button';
import { PlusIcon, PenSquareIcon, PenBoxIcon } from 'lucide-react';
import AdsToggleList from '@/components/adsList/adsToggleList';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { toast } from '@/components/ui/use-toast';
import { clientStorage } from '@/utils/storageService';
import { getUserAds } from '@/lib/getUserAds';
import ConfirmButton from '@/components/confirmationButton/confirmButton';
import { cancelTask } from '@/lib/cancelTask';

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
    const [adsPayList, setAdsPayList] = useState<AdsCardProps[]>([]);
    const [adsOpenList, setAdsOpenList] = useState<AdsCardProps[]>([]);
    const [adsWorkList, setAdsWorkList] = useState<AdsCardProps[]>([]);
    const [adsClosedList, setAdsClosedList] = useState<AdsCardProps[]>([]);
    const [isManaging, setIsManaging] = useState(false);
    const [cancelTaskIds, setCancelTaskIds] = useState<Set<string>>(new Set());

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
                .then((adsListData: GetUserAdsResponse) => {
                    const formattedAdsList: AdsCardProps[] =
                        adsListData.tasks.map(task => ({
                            taskId: task._id,
                            imageUrl: task.imageUrl,
                            title: task.title,
                            status: task.status,
                            startDate: dayjs(task.startDate).format(
                                'DD MMM YYYY',
                            ),
                            endDate: dayjs(task.endDate).format('DD MMM YYYY'),
                            location: task.location?.name,
                            applications: task.workers.toLocaleString(),
                            hiredworkersNumber: task.hiredWorkers.length,
                            wages: task.wages.toLocaleString(),
                            category: task.category,
                        }));
                    console.log(adsListData);

                    setAdsPayList(
                        formattedAdsList.filter(
                            task => task.status == AdsStateOptions.COMPLETED,
                        ),
                    );
                    setAdsOpenList(
                        formattedAdsList.filter(
                            task => task.status == AdsStateOptions.OPEN,
                        ),
                    );
                    setAdsWorkList(
                        formattedAdsList.filter(
                            task => task.status == AdsStateOptions.INPROGRESS,
                        ),
                    );
                    setAdsClosedList(
                        formattedAdsList.filter(
                            task => task.status == AdsStateOptions.CLOSED,
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
    // Define a function to add taskId to cancelTaskIds
    const handleAddToCancelList = (taskId: string) => {
        setCancelTaskIds(prevIds => {
            const newArray = Array.from(prevIds); // Convert Set to Array
            newArray.push(taskId); // Add the new taskId
            return new Set(newArray); // Convert Array back to Set and return
        });
        console.log(cancelTaskIds);
    };
    const handleRemoveFromCancelList = (taskId: string) => {
        setCancelTaskIds(prevIds => {
            const newIds = new Set(prevIds);
            newIds.delete(taskId);
            return newIds;
        });
        console.log(cancelTaskIds);
    };
    // Function to set isManaging to true
    const handleManage = () => {
        if (!isManaging) {
            setIsManaging(true);
        } else {
            setIsManaging(false);
        }
    };
    const handleSave = async () => {
        let cancelSuccess = true;
        // Convert Set to array using Array.from
        const cancelTaskIdsArray = Array.from(cancelTaskIds);

        try {
            for (const taskId of cancelTaskIdsArray) {
                const response = await cancelTask(taskId);
                console.log(response.success);
                if (response.success) {
                    console.log('cancel task success');
                } else {
                    cancelSuccess = false;
                }
            }
            if (cancelSuccess) {
                toast({
                    variant: 'default',
                    title: 'Canceled all selected task(s)',
                    description: 'You have successfully cancel task(s).',
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Task Cancelation Error',
                    description:
                        'You can not cancel task that was closed or not yours.',
                });
            }
        } catch (error) {
            console.error('Error applying for task:', error);
            toast({
                variant: 'destructive',
                title: 'Application Error',
                description:
                    'An error occurred while canceling task(s). Please try again later.',
            });
        }
        if (!isManaging) {
            setIsManaging(true);
        } else {
            setIsManaging(false);
        }
    };
    return (
        <main className='flex flex-col gap-[40px] items-center '>
            <div className='w-full flex justify-between'>
                <h1>Your Advertisements</h1>
                <div className='flex gap-[16px]'>
                    {/* Conditionally render Cancel or Create button */}
                    {isManaging ? (
                        <Button
                            onClick={handleManage}
                            className='gap-x-[10px] text-primary-500 bg-slate-50 border border-primary-500 border-[2px] hover:bg-slate-200'
                        >
                            Cancel
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                router.push('/task/create');
                            }}
                            className='gap-x-[10px] text-primary-500 bg-slate-50 border border-primary-500 border-[2px] hover:bg-slate-200'
                        >
                            <PlusIcon />
                            Create
                        </Button>
                    )}
                    {/* Conditionally render Save or Manage button */}
                    {/* {isManaging ? (
                        <ConfirmButton
                            confirmHandler={handleSave}
                            actionText='Save'
                            title='Are you sure?'
                            description='Canceled tasks CANNOT be reopened'
                            confirmText='Yes'
                            cancelText='No'
                        />
                    ) : (
                        <Button
                            onClick={handleManage}
                            className='gap-x-[10px] text-primary-500 bg-slate-50 border border-primary-500 border-[2px] hover:bg-slate-200'
                        >
                            <PenSquareIcon />
                            Manage
                        </Button>
                    )} */}
                </div>
            </div>
            <AdsToggleList
                type='open'
                adsList={adsPayList}
                managing={isManaging}
                onAddToCancelList={handleAddToCancelList}
                onRemoveFromCancelList={handleRemoveFromCancelList}
            />
            <AdsToggleList
                type='inprogress'
                adsList={adsOpenList}
                managing={isManaging}
                onAddToCancelList={handleAddToCancelList}
                onRemoveFromCancelList={handleRemoveFromCancelList}
            />
            <AdsToggleList
                type='completed'
                adsList={adsWorkList}
                managing={isManaging}
                onAddToCancelList={handleAddToCancelList}
                onRemoveFromCancelList={handleRemoveFromCancelList}
            />
            <AdsToggleList
                type='closed'
                adsList={adsClosedList}
                managing={isManaging}
                onAddToCancelList={handleAddToCancelList}
                onRemoveFromCancelList={handleRemoveFromCancelList}
            />
        </main>
    );
}
