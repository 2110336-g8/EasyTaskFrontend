'use client';

import { AdsCardProps } from '@/types/task';
import Link from 'next/link';
import {
    ClockIcon,
    InboxIcon,
    MapPinIcon,
    CalendarDaysIcon,
} from 'lucide-react';
// import { Button } from 'react-day-picker';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdsCard({
    props,
    buttonFunc,
    onAddToCancelList,
    onRemoveFromCancelList,
}: {
    props: AdsCardProps;
    buttonFunc: string;
    onAddToCancelList: (taskId: string) => void;
    onRemoveFromCancelList: (taskId: string) => void;
}) {
    // Assuming you have a functional component
    const router = useRouter();

    const handleViewTask = () => {
        router.push('/ads/' + props.taskId);
    };
    const [isCanceled, setIsCanceled] = useState(false);

    const handleCancelTask = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        const eventObject = event as unknown as Event;
        eventObject.stopPropagation();
        if (!isCanceled) {
            onAddToCancelList(props.taskId);
            setIsCanceled(true);
        } else {
            onRemoveFromCancelList(props.taskId);
            setIsCanceled(false);
        }
    };

    function FunctionalButton() {
        // Dynamically set buttonText based on status prop
        let buttonText;
        if (buttonFunc === 'open') {
            buttonText = 'Start Job';
        } else if (buttonFunc == 'working') {
            buttonText = 'Go to chat';
        } else if (buttonFunc == 'pay') {
            buttonText = 'Pay Deposit';
        } else if (buttonFunc == 'managing') {
            buttonText = isCanceled ? 'Canceled' : 'Cancel Task';
            return (
                <Button
                    variant={isCanceled ? 'gray' : 'destructive'}
                    onClick={handleCancelTask}
                >
                    {buttonText}
                </Button>
            );
        } else {
            return <div></div>;
        }

        return <Button>{buttonText}</Button>;
    }

    return (
        <div
            className='rounded-lg bg-card items-center flex text-card-foreground hover:shadow-md inner-border w-[1328px] h-auto overflow-hidden'
            onClick={handleViewTask}
            style={{ cursor: 'pointer' }}
        >
            <div className=''>
                <img
                    className='w-[320px] h-[180px] object-cover'
                    src={props.image || '/mocktask.png'}
                    alt={''}
                />
            </div>
            <div className='flex flex-row w-full p-[16px]'>
                <div className='flex flex-col  h-auto w-full p-[16px] gap-[8px]'>
                    <h3 className='text-slate-900 line-clamp-2 break-words'>
                        {props.title}
                    </h3>
                    {/* <div className='flex items-center gap-[4px]'>
                        <Button>hi</Button>
                    </div> */}
                    <div className='flex flex-row gap-[24px] '>
                        <small className='inline-block whitespace-nowrap gap-[4px] flex items-center text-slate-500'>
                            <CalendarDaysIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                            {props.startDate} - {props.endDate}
                        </small>
                        {props.location ? (
                            <small className='inline-block whitespace-nowrap gap-[4px] flex items-center text-slate-500'>
                                <MapPinIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                                {props.location}
                            </small>
                        ) : null}
                        {props.applications ? (
                            <small className='inline-block whitespace-nowrap gap-[4px] flex items-center text-slate-500'>
                                <InboxIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                                {props.applications} Applications
                            </small>
                        ) : null}
                    </div>
                    <div className='w-full flex flex-row gap-[24px]'>
                        {props.category ? (
                            <p className='px-[12px] py-[4px] rounded-[6px] border-[1px] border-primary-500 text-primary-500'>
                                {props.category}
                            </p>
                        ) : (
                            <div />
                        )}
                        <div className='font-extrabold text-[24px]/[32px] tracking-[.006em] text-slate-700'>
                            ฿ {props.wages}
                        </div>
                    </div>
                </div>
                <div className='flex item-centers justify-between pt-[40px] mr-[5px]'>
                    {FunctionalButton()}
                </div>
            </div>
        </div>
    );
}
