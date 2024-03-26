'use client';

import { TaskStateOptions, ViewAdsProps } from '@/types/task';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdsButtons(props: ViewAdsProps) {
    //=============OPEN=============//
    const SelectButton = () => {
        return (
            <Button className='w-full'>
                <Link href={`/task/${props.taskId}/select`}>Select Employees</Link>
            </Button>
        );
    };
    const StartButton = ({ variant }: { variant: 'default' | 'outline' }) => {
        return (
            <Button className='w-full' variant={variant}>
                Start Job Now
            </Button>
        );
    };

    //=============INPROGRESS=============//
    const ChatButton = () => {
        return (
            <Button className='w-full' asChild>
                <Link href={`/messages/${props.taskId}`}>Go to Messages</Link>
            </Button>
        );
    };

    //=============DISMISS=============//
    const DismissButton = () => {
        return (
            <Button className='w-full' variant='outline'>
                Dismiss Job
            </Button>
        );
    };

    switch (props.status) {
        //=============OPEN=============//
        case TaskStateOptions.OPEN:
            const isFull: boolean = false;
            const canApply: boolean = true;

            const canSelect: boolean = !isFull && canApply;
            const canStart: boolean = true;
            // const canStart: boolean = (props.acceptApplicants?.length ?? 0) > 0;

            return (
                <div className='flex flex-col gap-[8px]'>
                    {canSelect ? <SelectButton /> : null}
                    {canStart ? (
                        <StartButton
                            variant={canSelect ? 'outline' : 'default'}
                        />
                    ) : null}
                    <DismissButton />
                </div>
            );

        //=============INPROGRESS=============//
        case TaskStateOptions.INPROGRESS:
            return (
                <div className='flex flex-col gap-[8px]'>
                    <ChatButton />
                    <DismissButton />
                </div>
            );

        default:
            return null;
    }
}
