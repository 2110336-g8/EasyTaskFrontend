'use client';
import { useState } from 'react';
import { AdsCardProps } from '@/types/task';
import AdsCard from '@/components/adsList/adsCard';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

export default function AdsToggleList({
    type,
    adsList,
}: {
    type: keyof typeof names;
    adsList: AdsCardProps[];
}) {
    const names = {
        pay: 'To Pay Deposit',
        open: 'Open for Apply',
        working: 'Working On',
        closed: 'Closed',
    };

    const [isShow, setIsShow] = useState<boolean>(false);

    return (
        <div className='w-full flex flex-col gap-[20px]'>
            <div className='flex w-full gap-[8px]'>
                <button onClick={() => setIsShow(!isShow)}>
                    {isShow ? (
                        <ChevronDownIcon className='stroke-slate-500 stroke-2 w-[28px] h-[28px]' />
                    ) : (
                        <ChevronRightIcon className='stroke-slate-500 stroke-2 w-[28px] h-[28px]' />
                    )}
                </button>
                <h4 className='text-slate-500'>{names[type]}</h4>
            </div>
            {isShow ? (
                adsList.length > 0 ? (
                    <div className='w-fit'>
                        <div className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop-l:grid-cols-4 h-full w-fit gap-x-[16px] gap-y-[24px] justify-between'>
                            {adsList.map((task, index) => (
                                <AdsCard key={index} {...task} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <h4 className='w-fit text-slate-500'>
                        There is no matched task
                    </h4>
                )
            ) : null}
        </div>
    );
}
