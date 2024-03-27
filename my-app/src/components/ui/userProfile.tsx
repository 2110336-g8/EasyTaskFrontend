import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileProps, WorkerProps, WorkerStatusOptions } from '@/types/task';
import { PhoneIcon } from 'lucide-react';
import { Button } from './button';

export default function UserProfile(props: ProfileProps) {
    return (
        <a href={`/profile/${props._id}`}>
            <div className='flex flex-row items-center gap-[16px]'>
                <AvatarProfile {...props} />
                <div className='flex flex-col gap-[2px]'>
                    <p className='text-slate-700'>{props.name}</p>
                    <div className='flex gap-[4px] items-center'>
                        {props.phoneNumber ? (
                            <>
                                <PhoneIcon className='stroke-slate-700 stroke-2 w-[16px] h-[16px]' />
                                <p className='text-slate-700'>
                                    {props.phoneNumber}
                                </p>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </a>
    );
}

export function WorkerProfile(props: WorkerProps) {
    return (
        <div className='flex flex-row items-center gap-[16px]'>
            <AvatarProfile {...props} />
            <div className='flex flex-col gap-[2px]'>
                <a href={`/profile/${props._id}`}>
                    <div className='flex flex-col gap-[2px]'>
                        <p className='text-slate-700'>{props.name}</p>
                        <div className='flex gap-[4px] items-center'>
                            {props.phoneNumber ? (
                                <>
                                    <PhoneIcon className='stroke-slate-700 stroke-2 w-[16px] h-[16px]' />
                                    <p className='text-slate-700'>
                                        {props.phoneNumber}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    </div>
                </a>
                <WorkerStatus status={props.status} />
            </div>
        </div>
    );
}

const WorkerStatus = ({ status }: { status: WorkerStatusOptions }) => {
    const statusTextMap: { [key in WorkerStatusOptions]: string } = {
        [WorkerStatusOptions.INPROGRESS]: 'Working On',
        [WorkerStatusOptions.SUBMITTED]: 'Submitted',
        [WorkerStatusOptions.REVISING]: 'Revision Pending',
        [WorkerStatusOptions.RESUBMITTED]: 'Resubmitted',
        [WorkerStatusOptions.COMPLETED]: 'Completed',
        [WorkerStatusOptions.DISMISSED]: 'Dismissed',
    };

    const statusText: string = statusTextMap[status];

    return (
        <Button
            className='w-fit rounded-[26px]'
            size='xs'
            font='xs'
            variant={
                status === WorkerStatusOptions.SUBMITTED ||
                status === WorkerStatusOptions.RESUBMITTED
                    ? 'default'
                    : 'disabled'
            }
        >
            {statusText}
        </Button>
    );
};

export function AvatarProfile(props: ProfileProps) {
    return (
        <a href={`/profile/${props._id}`}>
            <Avatar key={props._id} style={{ width: '56px', height: '56px' }}>
                <AvatarImage src={props.image} alt='@shadcn' />
                <AvatarFallback>?</AvatarFallback>
            </Avatar>
        </a>
    );
}
