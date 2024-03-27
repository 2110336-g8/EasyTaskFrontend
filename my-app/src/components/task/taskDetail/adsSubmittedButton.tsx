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

export default function AdsSubmittedButtons({
    props,
    setIsLoading,
    checkWorker,
}: {
    props: ViewAdsProps;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    checkWorker: WorkerProps;
}) {
    //=============Chat=============//
    const ChatButton = () => {
        return (
            <Button className='w-full' variant='outline' asChild>
                <Link href={`/messages/${props.taskId}`}>Go to Messages</Link>
            </Button>
        );
    };
    //=============Submission=============//
    const acceptHandler = () => {
        acceptTask(props.taskId, checkWorker._id)
            .then(response => {
                toast({
                    variant: 'default',
                    title: 'Submission Accepted Successfully',
                    description:
                        'You have successfully accepted the submission.',
                });
                setIsLoading(true);
            })
            .catch(error => {
                console.error('Error Accept submission:', error);
                toast({
                    variant: 'destructive',
                    title: 'Submission Accept Error',
                    description:
                        typeof error === 'string'
                            ? error
                            : 'An unexpected error occurred. Please try again.',
                });
            });
    };

    const reviseHandler = () => {
        reviseTask(props.taskId, checkWorker._id)
            .then(response => {
                toast({
                    variant: 'default',
                    title: 'Request Revised Submission Successfully',
                    description:
                        'You have successfully requested the revised submission.',
                });
                setIsLoading(true);
            })
            .catch(error => {
                console.error('Error Request Revised Submission:', error);
                toast({
                    variant: 'destructive',
                    title: 'Request Revised Submission Error',
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
        type: 'accept' | 'revise';
        variant: 'default' | 'outline';
    }) => {
        return (
            <Dialog>
                <DialogTrigger type='button'>
                    {type === 'accept' ? (
                        <Button className='w-full' variant={variant}>
                            Accept Work
                        </Button>
                    ) : type === 'revise' ? (
                        <Button className='w-full' variant={variant}>
                            Request Revision
                        </Button>
                    ) : null}
                </DialogTrigger>
                <DialogContent className='rounded-[6px] border-slate-300'>
                    <DialogHeader className='flex flex-col text-left'>
                        <DialogTitle>
                            <h3 className='text-slate-900'>
                                {type === 'accept'
                                    ? 'Confirm the acceptance of the work?'
                                    : type === 'revise'
                                      ? 'Request a revision of the work?'
                                      : null}
                            </h3>
                        </DialogTitle>
                        <DialogDescription>
                            <p className='text-slate-500'>
                                {type === 'accept'
                                    ? 'This action will notice the employee that their work has been accepted. The wages will be promptly distributed to the employee.'
                                    : type === 'revise'
                                      ? 'This action will notice the employee that their work has been requested a revision. Please note that you are only permitted to request a revision once.'
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
                        {type === 'accept' ? (
                            <Button
                                className='w-full'
                                size='s'
                                font='s'
                                onClick={acceptHandler}
                            >
                                Confirm
                            </Button>
                        ) : type === 'revise' ? (
                            <Button
                                className='w-full'
                                size='s'
                                font='s'
                                onClick={reviseHandler}
                            >
                                Confirm
                            </Button>
                        ) : null}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    switch (checkWorker?.status) {
        //=============INPROGRESS=============//
        case WorkerStatusOptions.INPROGRESS:
            return (
                <div className='flex flex-col gap-[8px]'>
                    <Button className='w-full' disabled={true}>
                        Working On
                    </Button>
                    <ChatButton />
                </div>
            );

        //=============SUBMITTED=============//
        case WorkerStatusOptions.SUBMITTED:
            return (
                <div className='flex flex-col gap-[8px]'>
                    <DialogConfirm type='accept' variant='default' />
                    <DialogConfirm type='revise' variant='outline' />
                </div>
            );

        //=============REVISING=============//
        case WorkerStatusOptions.REVISING:
            return (
                <div className='flex flex-col gap-[8px]'>
                    <Button className='w-full' disabled={true}>
                        Revision Pending...
                    </Button>
                    <ChatButton />
                </div>
            );
        //=============RESUBMITTED=============//
        case WorkerStatusOptions.RESUBMITTED:
            return <DialogConfirm type='accept' variant='default' />;

        //=============COMPLETED=============//
        case WorkerStatusOptions.COMPLETED:
            return <DisabledButton text='Completed' />;
        //=============DISMISSED=============//
        case WorkerStatusOptions.DISMISSED:
            return <DisabledButton text='Not Proceed' />;

        default:
            return null;
    }
}
