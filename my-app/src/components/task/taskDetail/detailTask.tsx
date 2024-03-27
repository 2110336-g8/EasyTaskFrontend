'use client';

import { ViewAdsProps, ViewJobProps } from '@/types/task';
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
import AdsButtons from './adsButton';
import JobButtons from './jobButtons';
import { useRouter } from 'next/navigation';

export default function ViewTask({
    props,
    setIsLoading,
}: {
    props: ViewJobProps | ViewAdsProps;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const router = useRouter();
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
                            <JobButtons
                                props={props as ViewJobProps}
                                setIsLoading={setIsLoading}
                            />
                        ) : (
                            <AdsButtons
                                props={props as ViewAdsProps}
                                setIsLoading={setIsLoading}
                            />
                        )}
                        <FullWidthBar />
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
                                {props.startDate.format('DD/MM/YYYY')} -{' '}
                                {props.endDate.format('DD/MM/YYYY')}
                            </p>
                        </section>
                        <FullWidthBar />
                        {props.viewType == 'job' ? (
                            <JobUser {...(props as ViewJobProps)} />
                        ) : (
                            <AdsUser {...(props as ViewAdsProps)} />
                        )}
                    </aside>
                </section>
            </div>
        </main>
    );
}
