'use client';

import { JobStatusOptions, ViewJobProps } from '@/types/task';
import { Button } from '@/components/ui/button';
import { applyTask } from '@/lib/applyTask';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
            <Button onClick={applyTaskHandler} className='w-full text-white'>
                Apply Now
            </Button>
        );
    };

    const applyTaskHandler = () => {
        applyTask(props.taskId)
            .then(response => {
                toast({
                    variant: 'default',
                    title: 'Task Applied',
                    description: 'You have successfully applied for this task.',
                });
                setIsLoading(true);
            })
            .catch(error => {
                console.error('Error applying for task:', error);
                toast({
                    variant: 'destructive',
                    title: 'Application Error',
                    description:
                        typeof error === 'string'
                            ? error
                            : 'Unknown error occurred.',
                });
            });
    };

    //=============ACCEPT/REJECT OFFER=============//
    const AcceptButton = () => {
        return <Button className='w-full text-white'>Accept</Button>;
    };
    const RejectedButton = () => {
        return (
            <Button className='w-full text-white' variant='destructive'>
                Rejected
            </Button>
        );
    };

    //=============PENDING=============//
    const PendingButton = () => {
        return (
            <Button className='w-full text-white' disabled={true}>
                Pending...
            </Button>
        );
    };

    //=============SUBMIT+CHAT=============//
    const SubmitButton = () => {
        return <Button className='w-full text-white'>Submit</Button>;
    };
    const ChatButton = () => {
        return (
            <Button
                className='w-full text-primary-500'
                variant='outline'
                asChild
            >
                <Link href={`/messages/${props.taskId}`}>Go to Messages</Link>
            </Button>
        );
    };

    //=========Disabled======//
    const DisabledButton = ({ text }: { text: string }) => {
        return (
            <Button className='w-full text-white' variant='disabled'>
                {text}
            </Button>
        );
    };

    switch (props.status) {
        //=============APPLY=============//
        case JobStatusOptions.OPEN:
            return <ApplyButton />;

        //=============ACCEPT/REJECT OFFER=============//
        case JobStatusOptions.OFFERING:
            return (
                <div className='flex flex-col gap-[12px]'>
                    <AcceptButton />
                    <RejectedButton />
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
                    <SubmitButton />
                    <ChatButton />
                </div>
            );

        case JobStatusOptions.REVISING:
            return (
                <div className='flex flex-col gap-[12px]'>
                    <SubmitButton />
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
