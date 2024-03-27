'use client';

import { JobStatusOptions, ViewJobProps } from '@/types/task';
import { Button } from '@/components/ui/button';
import {
    acceptOffer,
    applyTask,
    rejectOffer,
    submitTask,
} from '@/lib/taskManagement';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';

export default function JobButtons({
    props,
    setIsLoading,
}: {
    props: ViewJobProps;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    //=============APPLY=============//
    const ApplyButton = () => {
        return (
            <Button onClick={applyHandler} className='w-full'>
                Apply Now
            </Button>
        );
    };

    const applyHandler = () => {
        applyTask(props.taskId)
            .then(response => {
                toast({
                    variant: 'default',
                    title: 'Task Applied Successful',
                    description: 'You have successfully applied the task.',
                });
                setIsLoading(true);
            })
            .catch(error => {
                console.error('Error applying for task:', error);
                toast({
                    variant: 'destructive',
                    title: 'Task Application Error',
                    description:
                        typeof error === 'string'
                            ? error
                            : 'An unexpected error occurred. Please try again.',
                });
            });
    };

    //=============ACCEPT/REJECT OFFER=============//

    const acceptHandler = () => {
        acceptOffer(props.taskId)
            .then(response => {
                toast({
                    variant: 'default',
                    title: 'Task Accepted Successfully',
                    description: 'You have successfully accepted the task.',
                });
                setIsLoading(true);
            })
            .catch(error => {
                console.error('Error Accepting for task:', error);
                toast({
                    variant: 'destructive',
                    title: 'Task Acception Error',
                    description:
                        typeof error === 'string'
                            ? error
                            : 'An unexpected error occurred. Please try again.',
                });
            });
    };

    const rejectHandler = () => {
        rejectOffer(props.taskId)
            .then(response => {
                toast({
                    variant: 'destructive',
                    title: 'Task Rejected Successfully',
                    description: 'You have successfully rejected the task.',
                });
                setIsLoading(true);
            })
            .catch(error => {
                console.error('Error Accepting for task:', error);
                toast({
                    variant: 'destructive',
                    title: 'Task Rejection Error',
                    description:
                        typeof error === 'string'
                            ? error
                            : 'An unexpected error occurred. Please try again.',
                });
            });
    };

    //=============PENDING=============//
    const PendingButton = () => {
        return (
            <Button className='w-full' disabled={true}>
                Pending...
            </Button>
        );
    };

    //=============SUBMIT+CHAT=============//
    const submitHandler = () => {
        submitTask(props.taskId)
            .then(response => {
                toast({
                    variant: 'default',
                    title: 'Task Submitted Successfully',
                    description: 'You have successfully submitted the task.',
                });
                setIsLoading(true);
            })
            .catch(error => {
                console.error('Error Submit task:', error);
                toast({
                    variant: 'destructive',
                    title: 'Task Submission Error',
                    description:
                        typeof error === 'string'
                            ? error
                            : 'An unexpected error occurred. Please try again.',
                });
            });
    };

    const ChatButton = () => {
        return (
            <Button className='w-full' variant='outline' asChild>
                <Link href={`/messages/${props.taskId}`}>Go to Messages</Link>
            </Button>
        );
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
    }: {
        type: 'accept' | 'reject' | 'submit' | 'resubmit';
    }) => {
        return (
            <Dialog>
                <DialogTrigger type='button'>
                    {type === 'accept' ? (
                        <Button className='w-full'>Accept</Button>
                    ) : type === 'reject' ? (
                        <Button className='w-full' variant='destructive'>
                            Reject
                        </Button>
                    ) : type === 'submit' ? (
                        <Button className='w-full'>Submit</Button>
                    ) : type === 'resubmit' ? (
                        <Button className='w-full'>Resubmit</Button>
                    ) : null}
                </DialogTrigger>
                <DialogContent className='rounded-[6px] border-slate-300'>
                    <DialogHeader className='flex flex-col text-left'>
                        <DialogTitle>
                            <h3 className='text-slate-900'>
                                {type === 'accept'
                                    ? 'Accept this job offer?'
                                    : type === 'reject'
                                      ? 'Reject this job offer?'
                                      : type === 'submit'
                                        ? 'Individually submit the work?'
                                        : type === 'resubmit'
                                          ? 'Resubmit this work?'
                                          : null}
                            </h3>
                        </DialogTitle>
                        <DialogDescription>
                            <p className='text-slate-500'>
                                {type === 'accept'
                                    ? 'This action can be undone. You cannot later reject this offer.'
                                    : type === 'reject'
                                      ? 'This action cannot be undone. Are you absolutely sure to reject this job?'
                                      : type === 'submit'
                                        ? 'This action will notice your employer to check only your submission. The employer may be request a revision.'
                                        : type === 'resubmit'
                                          ? 'This action will notice your employer to check only your submission. You have done a great work!'
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
                        ) : type === 'reject' ? (
                            <Button
                                className='w-full'
                                variant='destructive'
                                size='s'
                                font='s'
                                onClick={rejectHandler}
                            >
                                Reject
                            </Button>
                        ) : type === 'submit' || type === 'resubmit' ? (
                            <Button
                                className='w-full'
                                size='s'
                                font='s'
                                onClick={submitHandler}
                            >
                                Confirm
                            </Button>
                        ) : null}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    switch (props.jobStatus) {
        //=============APPLY=============//
        case JobStatusOptions.OPEN:
            return <ApplyButton />;

        //=============ACCEPT/REJECT OFFER=============//
        case JobStatusOptions.OFFERING:
            return (
                <div className='flex flex-col gap-[12px]'>
                    <DialogConfirm type='accept' />
                    <DialogConfirm type='reject' />
                </div>
            );

        //=============PENDING=============//
        case JobStatusOptions.PENDING: //pending for offering
        case JobStatusOptions.ACCEPTED: //pending for start task
        case JobStatusOptions.SUBMITTED: //pending for check submission
            return <PendingButton />;

        //=============SUBMIT+CHAT=============//
        case JobStatusOptions.INPROGRESS:
            return (
                <div className='flex flex-col gap-[12px]'>
                    <DialogConfirm type='submit' />
                    <ChatButton />
                </div>
            );

        case JobStatusOptions.REVISING:
            return (
                <div className='flex flex-col gap-[12px]'>
                    <DialogConfirm type='resubmit' />
                    <ChatButton />
                </div>
            );

        //=============DISABLED=============//
        case JobStatusOptions.REJECTED:
            return <DisabledButton text='Rejected' />;

        case JobStatusOptions.NOTPROCEED:
            return <DisabledButton text='Not Proceed' />;

        case JobStatusOptions.DISMISSED:
            return <DisabledButton text='Dismissed' />;

        case JobStatusOptions.RESUBMITTED:
        case JobStatusOptions.COMPLETED:
            return <DisabledButton text='Completed' />;
        default:
            return null;
    }
}
