'use client';

import {
    TaskStateOptions,
    ViewAdsProps,
    ViewJobProps,
    WorkerProps,
} from '@/types/task';
import {
    ArrowLeftIcon,
    BanknoteIcon,
    CalendarDaysIcon,
    FoldersIcon,
    UsersIcon,
} from 'lucide-react';
import MapReadOnly from '../../map/mapBoxReadOnly';
import Image from 'next/image';
import FullWidthBar from '../../ui/hbar';
import JobUser from './jobUser';
import AdsUser from './adsUser';
import JobButtons from './jobButtons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import UserProfile from '@/components/ui/userProfile';
import AdsGeneralButtons from './adsGeneralButton';
import AdsSubmittedButtons from './adsSubmittedButton';

export default function ViewTask({
    props,
    setIsLoading,
}: {
    props: ViewJobProps | ViewAdsProps;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const router = useRouter();
    const [sideState, setSideState] = useState<'general' | 'submitted'>(
        'general',
    );
    const [checkWorker, setCheckWorker] = useState<WorkerProps>(
        (props as ViewAdsProps).hiredWorkers?.[0],
    );

    const SideTag = () => {
        const defaultStyle =
            'text-button-xs font-button-xs  tracking-button-xs items-center text-center px-[12px] py-[6px] cursor-pointer';
        const selectedStyle =
            'text-primary-500 border-b-[1.5px] border-primary-500';
        const notSelectedStyle = 'text-slate-500 bg-slate-200';
        return (
            <div className='grid grid-cols-2 w-full'>
                <div
                    className={cn(
                        { 'rounded-l-[3px]': sideState !== 'general' },
                        defaultStyle,
                        {
                            [selectedStyle]: sideState === 'general',
                            [notSelectedStyle]: sideState !== 'general',
                        },
                    )}
                    onClick={() => setSideState('general')}
                >
                    General
                </div>
                <div
                    className={cn(
                        { 'rounded-r-[3px]': sideState !== 'submitted' },
                        defaultStyle,
                        {
                            [selectedStyle]: sideState === 'submitted',
                            [notSelectedStyle]: sideState !== 'submitted',
                        },
                    )}
                    onClick={() => {
                        setSideState('submitted');
                    }}
                >
                    Submitted
                </div>
            </div>
        );
    };

    return (
        <main className='flex justify-center items-center'>
            <div className='flex flex-col w-[1000px] gap-[24px]'>
                <div className='absolute'>
                    <a
                        className='relative right-[80px] cursor-pointer'
                        onClick={() => router.back()}
                    >
                        <ArrowLeftIcon className='w-[40px] h-[52px]' />
                    </a>
                </div>
                <header className='w-full flex flex-col gap-[2px]'>
                    <h1 className='text-slate-900 text-balance break-words '>
                        {props.title}
                    </h1>
                    <p className='text-slate-400'>Posted {props.posted}</p>
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
                            <JobButtons
                                props={props as ViewJobProps}
                                setIsLoading={setIsLoading}
                            />
                        ) : (
                            <>
                                {props.status !== TaskStateOptions.OPEN ? (
                                    <>
                                        <SideTag />
                                        {sideState == 'submitted' ? (
                                            <>
                                                <div className='flex flex-col gap-[8px]'>
                                                    <small className='text-slate-400'>
                                                        Individual work from
                                                    </small>
                                                    <UserProfile
                                                        {...checkWorker}
                                                    />
                                                </div>
                                                <AdsSubmittedButtons
                                                    props={
                                                        props as ViewAdsProps
                                                    }
                                                    setIsLoading={setIsLoading}
                                                    checkWorker={checkWorker}
                                                />
                                            </>
                                        ) : (
                                            <AdsGeneralButtons
                                                props={props as ViewAdsProps}
                                                setIsLoading={setIsLoading}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <AdsGeneralButtons
                                        props={props as ViewAdsProps}
                                        setIsLoading={setIsLoading}
                                    />
                                )}
                            </>
                        )}

                        <section className='grid grid-cols-6 auto-cols-auto items-center gap-y-[16px] gap-x-[4px]'>
                            <p className='col-span-2 flex w-fit items-center gap-[4px]'>
                                <FoldersIcon className='stroke-slate-700 stroke-2 w-[16px] h-[16px]' />
                                <p className='text-slate-700'>Category</p>
                            </p>
                            <div className='col-span-4 flex'>
                                <div>
                                    <div className='inline-flex text-button-s font-button-s tracking-button-s px-[12px] py-[4px] rounded-[6px] border-[1px] border-primary-500 text-primary-500'>
                                        {props.category}
                                    </div>
                                </div>
                            </div>
                            <p className='col-span-2 flex w-fit items-center gap-[4px]'>
                                <UsersIcon className='stroke-slate-700 stroke-2 w-[16px] h-[16px]' />
                                <p className='text-slate-700'>Team</p>
                            </p>
                            <p className='col-span-4 text-slate-700'>
                                {props.workers} people
                            </p>
                            <p className='col-span-2 flex w-fit items-center gap-[4px]'>
                                <BanknoteIcon className='stroke-slate-700 stroke-2 w-[16px] h-[16px]' />
                                <p className='text-slate-700'>Wages</p>
                            </p>
                            <p className='col-span-4 text-slate-700'>
                                {props.wages} Baht/person
                            </p>
                            <p className='col-span-2 flex w-fit items-center gap-[4px]'>
                                <CalendarDaysIcon className='stroke-slate-700 stroke-2 w-[16px] h-[16px]' />
                                <p className='text-slate-700'>Apply</p>
                            </p>
                            <p className='col-span-4 text-slate-700'>
                                {props.startDate.format('DD/MM/YYYY')} -{' '}
                                {props.endDate.format('DD/MM/YYYY')}
                            </p>
                        </section>
                        <FullWidthBar />
                        {props.viewType == 'job' ? (
                            <JobUser {...(props as ViewJobProps)} />
                        ) : (
                            <AdsUser
                                props={props as ViewAdsProps}
                                setCheckWorker={setCheckWorker}
                                setSideState={setSideState}
                            />
                        )}
                    </aside>
                </section>
            </div>
        </main>
    );
}
