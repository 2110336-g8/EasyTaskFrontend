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

export default function AdsList() {
    const router = useRouter();

    const userId: string | null = clientStorage.get().user._id;

    return (
        <main className='flex flex-col gap-[40px] items-center '>
            <div className='w-full flex justify-between'>
                <h1>Your Advertisements</h1>
                <div className='flex gap-[16px]'>
                    {/* Conditionally render Cancel or Create button */}
                    {/* {isManaging ? (
                        <Button
                            onClick={handleManage}
                            className='gap-x-[10px] text-primary-500 bg-slate-50 border border-primary-500 border-[2px] hover:bg-slate-200'
                        >
                            Cancel
                        </Button>
                    ) : ( */}
                    <Button
                        onClick={() => {
                            router.push('/task/create');
                        }}
                        className='gap-x-[10px] text-primary-500 bg-slate-50 border border-primary-500 border-[2px] hover:bg-slate-200'
                    >
                        <PlusIcon />
                        Create
                    </Button>
                    {/* )} */}
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
            <AdsToggleList type='Open' userId={userId} />
            <AdsToggleList type='InProgress' userId={userId} />
            <AdsToggleList type='Completed' userId={userId} />
            <AdsToggleList type='Dismissed' userId={userId} />
        </main>
    );
}
