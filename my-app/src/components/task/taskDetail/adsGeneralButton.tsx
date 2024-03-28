'use client';

import {
    TaskStateOptions,
    ViewAdsProps,
    WorkerProps,
    WorkerStatusOptions,
} from '@/types/task';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    acceptTask,
    dismissTask,
    reviseTask,
    startTask,
} from '@/lib/taskManagement';
import { toast } from '@/components/ui/use-toast';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import dayjs from 'dayjs';
import Warning from './warning';

export default function AdsGeneralButtons({
    props,
    setIsLoading,
}: {
    props: ViewAdsProps;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    //=============OPEN=============//
    const SelectButton = () => {
        return (
            <Button
                className='w-full'
                disabled={(props.pendingApplicants?.length || 0) <= 0}
            >
                <Link href={`/task/${props.taskId}/select`}>
                    Select Employees
                </Link>
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
    const dismissHandler = () => {
        dismissTask(props.taskId)
            .then(response => {
                toast({
                    variant: 'destructive',
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

    //=========Disabled======//
    const DisabledButton = ({ text }: { text: string }) => {
        return (
            <Button className='w-full' variant='disabled'>
                {text}
            </Button>
        );
    };

    //=========Dialog===========//
    const DialogConfirm = ({
        type,
        variant,
    }: {
        type: 'start' | 'dismiss';
        variant: 'default' | 'outline';
    }) => {
        return (
            <Dialog>
                <DialogTrigger type='button'>
                    {type === 'start' ? (
                        <Button className='w-full' variant={variant}>
                            Start Job Now
                        </Button>
                    ) : type === 'dismiss' ? (
                        <Button className='w-full' variant={variant}>
                            Dismiss Job
                        </Button>
                    ) : null}
                </DialogTrigger>
                <DialogContent className='rounded-[6px] border-slate-300'>
                    <DialogHeader className='flex flex-col text-left'>
                        <DialogTitle>
                            <h3 className='text-slate-900'>
                                {type === 'start'
                                    ? 'Are you absolutely sure to start job?'
                                    : type === 'dismiss'
                                      ? 'Are you absolutely sure to dismiss job?'
                                      : null}
                            </h3>
                        </DialogTitle>
                        <DialogDescription>
                            <p className='text-slate-500'>
                                {type === 'start'
                                    ? 'This action will be notice all employees to start working on this job.'
                                    : type === 'dismiss'
                                      ? props.status === TaskStateOptions.OPEN
                                          ? 'This action will immediately dismiss this job and notice all applicant about this job dismissing.'
                                          : 'This action will promptly notify all employees of the job dismissal. Thirty percent of the wages will be distributed among all employees, and the remaining leave will be transferred to you.'
                                      : null}
                            </p>
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className='w-full flex flex-row justify-end items-center self-stretch gap-[8px]'>
                        <DialogClose asChild>
                            <Button
                                className='w-full border-[1px]'
                                variant='outlineslate'
                                size='s'
                                font='s'
                                type='button'
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        {type === 'start' ? (
                            <Button
                                className='w-full'
                                size='s'
                                font='s'
                                onClick={startHandler}
                            >
                                Confirm
                            </Button>
                        ) : type === 'dismiss' ? (
                            <Button
                                className='w-full'
                                variant='destructive'
                                size='s'
                                font='s'
                                onClick={dismissHandler}
                            >
                                Dismiss Job
                            </Button>
                        ) : null}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    switch (props.status) {
        //=============OPEN=============//
        case TaskStateOptions.OPEN:
            const isFull: boolean =
                (props.acceptApplicants?.length || 0) >=
                parseInt(props.workers);
            const canApply: boolean = dayjs(props.endDate).isAfter(dayjs());

            const canSelect: boolean = !isFull && canApply;
            const canStart: boolean = (props.acceptApplicants?.length || 0) > 0;

            return (
                <div className='flex flex-col gap-[8px]'>
                    {canSelect ? <SelectButton /> : null}
                    {canStart ? (
                        <DialogConfirm
                            type='start'
                            variant={canSelect ? 'outline' : 'default'}
                        />
                    ) : null}
                    <DialogConfirm type='dismiss' variant='outline' />
                    {canStart ? (
                        <Warning>
                            It will be automatically dismissed one week after
                            application period.
                        </Warning>
                    ) : null}
                </div>
            );

        //=============INPROGRESS=============//
        case TaskStateOptions.INPROGRESS:
            return (
                <div className='flex flex-col gap-[8px]'>
                    <ChatButton />
                    <DialogConfirm type='dismiss' variant='outline' />
                </div>
            );

        //=============COMPLETE=============//
        case TaskStateOptions.COMPLETED:
            return <DisabledButton text='Completed' />;

        //=============DISMISSED=============//
        case TaskStateOptions.DISMISSED:
            return <DisabledButton text='Dismissed' />;

        default:
            return null;
    }
}
