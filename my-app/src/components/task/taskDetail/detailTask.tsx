'use client';

import { toast } from '../../ui/use-toast';
import { clientStorage } from '@/utils/storageService';
import { Button } from '@/components/ui/button';
import { ViewAdsProps, ViewJobProps, ViewTaskProps } from '@/types/task';
import {
    ArrowLeftIcon,
    BanknoteIcon,
    CalendarDaysIcon,
    FoldersIcon,
    UsersIcon,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import MapReadOnly from '../../map/mapBoxReadOnly';
import axios from 'axios';
import { applyTask } from '@/lib/applyTask';
import Image from 'next/image';
import FullWidthBar from '../../ui/hbar';
import JobUser from './jobUser';
import AdsUser from './adsUser';
import AdsButtons from './adsButton';
import JobButtons from './jobButtons';

export default function ViewTask(props: ViewJobProps | ViewAdsProps) {
    // const [isLoggedIn, setIsLoggedIn] = useState(!!clientStorage.get().token);
    // const [hasApplied, setHasApplied] = useState(false);

    // const api = axios.create({
    //     baseURL: 'http://api.easytask.vt.in.th/v1/tasks/',
    //     headers: {
    //         'Content-Type': 'application/json', // change this to axios instance
    //     },
    // });

    // useEffect(() => {
    //     async function checkAppliedStatus() {
    //         try {
    //             const response = await api.get(`${props.taskId}/check`, {
    //                 headers: {
    //                     Authorization: `Bearer ${clientStorage.get().token}`,
    //                 },
    //             });

    //             if (response.status === 200) {
    //                 setHasApplied(response.data.hasApplied);
    //             } else {
    //                 console.error(
    //                     'Error checking application status:',
    //                     response.data.error,
    //                 );
    //             }
    //         } catch (error) {
    //             console.error('Error checking application status:', error);
    //         }
    //     }

    //     if (isLoggedIn) {
    //         checkAppliedStatus();
    //     }
    // }, [isLoggedIn, props.taskId]);

    // const applyTaskHandler = async () => {
    //     console.log(isLoggedIn);
    //     if (!isLoggedIn) {
    //         toast({
    //             variant: 'destructive',
    //             title: 'Login Required',
    //             description: 'You need to login first to apply for this task.',
    //         });
    //         return;
    //     }

    //     try {
    //         const response = await applyTask(
    //             props.taskId,
    //             clientStorage.get().token,
    //         );
    //         console.log(response.success);
    //         if (response.success) {
    //             console.log('applied task success');
    //             toast({
    //                 variant: 'default',
    //                 title: 'Task Applied',
    //                 description: 'You have successfully applied for this task.',
    //             });
    //             setHasApplied(true);
    //         } else {
    //             toast({
    //                 variant: 'destructive',
    //                 title: 'Application Error',
    //                 description:
    //                     response.error ||
    //                     'An error occurred while applying for the task.',
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error applying for task:', error);
    //         toast({
    //             variant: 'destructive',
    //             title: 'Application Error',
    //             description:
    //                 'An error occurred while applying for the task. Please try again later.',
    //         });
    //     }
    // };

    // useEffect(() => {
    //     async function checkAppliedStatus() {
    //         try {
    //             const response = await fetch(
    //                 `http://api.easytask.vt.in.th/v1/tasks/${props.taskId}/check`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${clientStorage.get().token}`,
    //                     },
    //                 },
    //             );

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setHasApplied(data.hasApplied);
    //             } else {
    //                 const errorData = await response.json();
    //                 console.error(
    //                     'Error checking application status:',
    //                     errorData.error,
    //                 );
    //             }
    //         } catch (error) {
    //             console.error('Error checking application status:', error);
    //         }
    //     }

    //     if (isLoggedIn) {
    //         checkAppliedStatus();
    //     }
    // }, [isLoggedIn, props.taskId]);

    return (
        <main className='flex justify-center items-center'>
            <div className='flex flex-col w-[1000px] gap-[24px]'>
                <div className='absolute'>
                    <a className='relative right-[80px]' href='/task'>
                        <ArrowLeftIcon className='w-[40px] h-[40px]' />
                    </a>
                </div>
                <header className='w-full flex flex-col gap-[2px]'>
                    <h1 className='text-slate-900 text-balance break-words '>
                        {props.title}
                    </h1>
                    <p className='text-slate-400'>Posted {props.posted} ago</p>
                </header>
                <section className='w-full flex flex-row justify-between gap-[40px]'>
                    <article className='flex flex-col w-[640px] gap-[24px]'>
                        <figure className='w-full h-[360px] '>
                            <Image
                                width={0}
                                height={0}
                                sizes='100vw'
                                src={props.imageUrl || '/mocktask.png'}
                                alt=''
                                className='rounded-lg w-full h-full object-cover'
                            />
                        </figure>
                        {props.description ? (
                            <section className='flex flex-col gap-[16px]'>
                                <h4 className='text-slate-900'>Description</h4>
                                <p className='text-slate-600 text-pretty break-words'>
                                    {props.description}
                                </p>
                            </section>
                        ) : null}
                        {props.location ? (
                            <section className='flex flex-col gap-[16px]'>
                                <h4 className='text-slate-900'>Location</h4>
                                <p className='text-slate-600'>
                                    {props.location.name}
                                </p>
                                <div>
                                    <MapReadOnly
                                        coord={{
                                            lat: props.location.latitude,
                                            lng: props.location.longitude,
                                        }}
                                    />
                                </div>
                            </section>
                        ) : null}
                    </article>
                    <aside className='flex flex-col w-[320px] gap-[24px]'>
                            {props.viewType == 'job' ? (
                                <JobButtons {...(props as ViewJobProps)} />
                            ) : (
                                <AdsButtons {...(props as ViewAdsProps)} />
                            )}
                        {/* <Button
                            onClick={applyTaskHandler}
                            disabled={!isLoggedIn || hasApplied}
                            className='w-full'
                        >
                            {!isLoggedIn
                                ? 'Please Login'
                                : hasApplied
                                  ? 'Applied'
                                  : 'Apply Now'}
                        </Button> */}

                        <section className='grid grid-cols-8 auto-cols-auto items-center gap-y-[16px] gap-x-[4px]'>
                            <p className='col-span-3 flex w-fit items-center gap-[4px]'>
                                <FoldersIcon className='stroke-slate-700 stroke-2 w-[16px] h-[16px]' />
                                <p className='text-slate-700'>Category</p>
                            </p>
                            <div className='col-span-5 flex '>
                                <div className='inline-flex text-button-s font-button-s tracking-button-s px-[12px] py-[4px] rounded-[6px] border-[1px] border-primary-500 text-primary-500'>
                                    {props.category}
                                </div>
                            </div>
                            <p className='col-span-3 flex w-fit items-center gap-[4px]'>
                                <UsersIcon className='stroke-slate-700 stroke-2 w-[16px] h-[16px]' />
                                <p className='text-slate-700'>Team</p>
                            </p>
                            <p className='col-span-5 text-slate-700'>
                                {props.workers} people
                            </p>
                            <p className='col-span-3 flex w-fit items-center gap-[4px]'>
                                <BanknoteIcon className='stroke-slate-700 stroke-2 w-[16px] h-[16px]' />
                                <p className='text-slate-700'>Wages</p>
                            </p>
                            <p className='col-span-5 text-slate-700'>
                                {props.wages} Baht/person
                            </p>
                            <p className='col-span-3 flex w-fit items-center gap-[4px]'>
                                <CalendarDaysIcon className='stroke-slate-700 stroke-2 w-[16px] h-[16px]' />
                                <p className='text-slate-700'>Apply Period</p>
                            </p>
                            <p className='col-span-5 text-slate-700'>
                                {props.startDate} - {props.endDate}
                            </p>
                        </section>
                        <FullWidthBar />
                        {props.viewType == 'job' ? (
                            <JobUser {...props} />
                        ) : (
                            <AdsUser {...props} />
                        )}
                    </aside>
                </section>
            </div>
        </main>
    );
}
