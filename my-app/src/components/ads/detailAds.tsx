'use client';

import { Button } from '@/components/ui/button';
import { ViewAdsProps } from '@/types/task';
import { ArrowLeftIcon } from 'lucide-react';
import Image from 'next/image';
import FullWidthBar from '@/components/ui/hbar';
import Map from '@/components/createTask/mapBox';
import React, { useState } from 'react';
import { dateNow, dateToString, formatDateDuration } from '@/utils/datetime';
import { clientStorage } from '@/utils/storageService';

export default function ViewAds(props: ViewAdsProps) {
    return (
        <main className='flex justify-center items-center'>
            <div className='flex flex-col w-[1000px] gap-[40px]'>
                <div className='absolute'>
                    <a className='relative right-[80px]' href='/ads'>
                        <ArrowLeftIcon className=' w-[40px] h-[40px]' />
                    </a>
                </div>

                <header>
                    <h1 className='text-slate-900'>{props.title}</h1>
                    <p className='text-slate-400'>
                        Posted {formatDateDuration(props.createdAt, dateNow())}{' '}
                        ago
                    </p>
                </header>

                <section className='flex flex-row justify-between gap-[40px]'>
                    <article className='flex-1 w-2/3 flex flex-col gap-[24px]'>
                        <figure className='w-full h-[360px] '>
                            <Image
                                width={0}
                                height={0}
                                sizes='100vw'
                                src={props.image || '/mocktask.png'}
                                alt=''
                                className='rounded-lg w-full h-full object-cover'
                            />
                        </figure>
                        {props.description ? (
                            <section className='flex flex-col gap-[16px]'>
                                <h4 className='text-slate-900 justify-self-center font-medium'>
                                    Description
                                </h4>
                                <p className='text-slate-600'>
                                    {props.description || ''}
                                </p>
                            </section>
                        ) : null}
                        <section className='flex flex-col gap-[16px]'>
                            <h4 className='text-slate-900 justify-self-center font-medium'>
                                Location
                            </h4>
                            <p className='text-slate-600'>
                                {props.location?.name}
                            </p>
                            <div>
                                {/* todo: Make a new read-only with preset pin map component */}
                                <Map onPinLocation={() => {}} />
                            </div>
                        </section>
                    </article>

                    <aside className='flex-2 w-1/3'>
                        <div className='flex flex-col gap-[24px]'>
                            <Button>Start Job Now</Button>

                            {/* Task summary */}
                            <div className='flex flex-col gap-[16px]'>
                                <div className='flex flex-row justify-between gap-[0px]'>
                                    <div className='flex-1 w-1/3'>
                                        <p className='text-slate-900 justify-self-start'>
                                            Category
                                        </p>
                                    </div>
                                    <div className='flex flex-2 w-2/3 items-center justify-self-start'>
                                        <p className='px-[12px] py-[4px] rounded-[6px] border-[1px] border-primary-500 text-primary-500 -translate-y-1'>
                                            {props.category}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between gap-[0px] -translate-y-1'>
                                    <div className='flex-1 w-1/3'>
                                        <p className='text-slate-900 justify-self-start'>
                                            Team
                                        </p>
                                    </div>
                                    <div className='flex flex-2 w-2/3 items-center justify-self-start'>
                                        <p className='text-slate-700 justify-self-start'>
                                            {props.workers} people
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between gap-[0px]'>
                                    <div className='flex-1 w-1/3'>
                                        <p className='text-slate-900 justify-self-start'>
                                            Wages
                                        </p>
                                    </div>
                                    <div className='flex flex-2 w-2/3 items-center justify-self-start'>
                                        <p className='text-slate-700 justify-self-start'>
                                            ฿{props.wages} / person
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between gap-[0px]'>
                                    <div className='flex-1 w-1/3'>
                                        <p className='text-slate-900 justify-self-start'>
                                            Length
                                        </p>
                                    </div>
                                    <div className='flex flex-2 w-2/3 items-center justify-self-start'>
                                        <p className='text-slate-700 justify-self-start'>
                                            {formatDateDuration(
                                                props.startDate,
                                                props.endDate,
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between gap-[0px]'>
                                    <div className='flex-1 w-1/3'>
                                        <p className='text-slate-900 justify-self-start'>
                                            Type
                                        </p>
                                    </div>
                                    <div className='flex flex-2 w-2/3 items-center justify-self-start'>
                                        <p className='text-slate-700 justify-self-start'>
                                            {'One-time Project'}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between gap-[0px]'>
                                    <div className='flex-1 w-1/3'>
                                        <p className='text-slate-900 justify-self-start'>
                                            Duration
                                        </p>
                                    </div>
                                    <div className='flex flex-2 w-2/3 items-center justify-self-start'>
                                        <p className='text-slate-700 justify-self-start'>
                                            {dateToString(
                                                props.startDate,
                                                'DD/MM/YYYY',
                                            )}{' '}
                                            -{' '}
                                            {dateToString(
                                                props.endDate,
                                                'DD/MM/YYYY',
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <FullWidthBar />

                            <div>
                                <h4 className='text-slate-900 justify-self-center font-medium'>
                                    Candidate Applications (
                                    {props.applicants.length})
                                </h4>
                            </div>

                            <div className='grid grid-cols-5 gap-4'>
                                {props.applicants.map(worker => (
                                    <figure
                                        key={worker.workerId}
                                        className='w-14 h-14'
                                    >
                                        <Image
                                            width={56}
                                            height={56}
                                            sizes='(max-width: 56px) 100vw, 56px'
                                            src={props.image || '/mocktask.png'}
                                            alt=''
                                            className='rounded-full object-cover'
                                        />
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </aside>
                </section>
            </div>
        </main>
    );
}
