'use client';
import { useState } from 'react';
import { AdsCardProps } from '@/types/task';
import JobCard from './jobCard';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

export default function JobToggleList({
    type,
    adsList,
    managing,
}: {
    type: keyof typeof names;
    adsList: AdsCardProps[];
    managing: boolean;
}) {
    const names = {
        offer: 'Offering',
        onGoing: 'Ongoing',
        pending: 'Pending',
        accomplished: 'Accomplished',
        rejected: 'Rejected',
        notProceed: 'Not Proceed',
    };

    const [isShow, setIsShow] = useState<boolean>(false);
    const [buttonFuncType, setButtonFuncType] = useState<string>(type);
    if (managing) {
        setButtonFuncType('managing');
    }

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
                                <JobCard
                                    key={index}
                                    {...task}
                                    buttonFunc={type}
                                />
                            ))}
                        </div>
                    </div>
                ) : null
            ) : null}
        </div>
    );
}
