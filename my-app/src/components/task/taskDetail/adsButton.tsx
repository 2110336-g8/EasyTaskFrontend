'use client';

import { TaskStateOptions, ViewAdsProps } from '@/types/task';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { dismissTask, startTask } from '@/lib/taskManagement';
import { toast } from '@/components/ui/use-toast';

export default function AdsButtons({
    props,
    setIsLoading,
}: {
    props: ViewAdsProps;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    //=============OPEN=============//
    const SelectButton = () => {
        return (
            <Button className='w-full'>
                <Link href={`/task/${props.taskId}/select`}>
                    Select Employees
                </Link>
            </Button>
        );
    };

    const StartButton = ({ variant }: { variant: 'default' | 'outline' }) => {
        return (
            <Button onClick={startHandler} className='w-full' variant={variant}>
                Start Job Now
            </Button>
        );
    };

    const startHandler = () => {
        startTask(props.taskId)
            .then(response => {
                toast({
                    variant: 'default',
                    title: 'Task Started Successfully',
                    description: 'You have successfully started the task.',
                });
                setIsLoading(true);
            })
            .catch(error => {
                console.error('Error Starting for task:', error);
                toast({
                    variant: 'destructive',
                    title: 'Task Start Error',
                    description:
                        typeof error === 'string'
                            ? error
                            : 'An unexpected error occurred. Please try again.',
                });
            });
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
            <Button onClick={dismissHandler} className='w-full' variant='outline'>
                Dismiss Job
            </Button>
        );
    };

    const dismissHandler = () => {
        dismissTask(props.taskId)
            .then(response => {
                toast({
                    variant: 'default',
                    title: 'Task Dismissed Successfully',
                    description: 'You have successfully dismissed the task.',
                });
                setIsLoading(true);
            })
            .catch(error => {
                console.error('Error Dismiss for task:', error);
                toast({
                    variant: 'destructive',
                    title: 'Task Dismiss Error',
                    description:
                        typeof error === 'string'
                            ? error
                            : 'An unexpected error occurred. Please try again.',
                });
            });
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
