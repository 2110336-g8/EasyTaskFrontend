'use client';

import { ViewTaskProps } from '@/types/task';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

export default function JobUser(props: ViewTaskProps) {
    return (
        <div className='flex flex-col gap-[16px]'>
            <h4>About the Client</h4>
            <div className='flex flex-row items-center gap-[16px]'>
                <Avatar key={props.customer?._id} style={{ width: '56px', height: '56px' }}>
                    <AvatarImage src={props.customer?.image} alt='@shadcn' />
                    <AvatarFallback>?</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-[4px]'>
                    <p>{props.customer?.name}</p>
                    {props.customer?.phoneNumber ? (
                        <p>{props.customer.phoneNumber}</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
