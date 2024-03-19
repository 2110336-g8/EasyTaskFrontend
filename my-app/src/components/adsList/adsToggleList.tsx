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
            <div
                className='group flex w-full gap-[8px] cursor-pointer'
                onClick={() => setIsShow(!isShow)}
            >
                <button>
                    {isShow ? (
                        <ChevronDownIcon className='stroke-slate-500 stroke-2 w-[28px] h-[28px] group-hover:stroke-primary-500' />
                    ) : (
                        <ChevronRightIcon className='stroke-slate-500 stroke-2 w-[28px] h-[28px] group-hover:stroke-primary-500' />
                    )}
                </button>
                <h4 className='text-slate-500 group-hover:text-primary-500 group-hover:font-medium'>
                    {names[type]}
                </h4>
            </div>
            {isShow ? (
                adsList.length > 0 ? (
                    <div className='w-fit'>
                        <div className='flex flex-col gap-[24px] tablet:grid-cols-2 laptop:grid-cols-3 desktop-l:grid-cols-4 w-full gap-y-[24px] justify-between'>
                            {adsList.map((task, index) => (
                                <AdsCard key={index} {...task} />
                            ))}
                        </div>
                    </div>
                ) : null
            ) : null}
        </div>
    );
}
