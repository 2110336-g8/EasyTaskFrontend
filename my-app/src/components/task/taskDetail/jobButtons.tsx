'use client';

import { JobStatusOptions, ViewJobProps } from '@/types/task';
import { Button } from '@/components/ui/button';

export default function JobButtons(props: ViewJobProps) {
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

//=============APPLY=============//
const ApplyButton = () => {
    return <Button className='w-full text-white'>Apply Now</Button>;
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
        <Button className='w-full text-primary-500' variant='outline'>
            Go to Messages
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
