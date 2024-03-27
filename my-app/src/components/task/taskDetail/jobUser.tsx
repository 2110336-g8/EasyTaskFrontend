'use client';

import UserProfile from '@/components/ui/userProfile';
import { ViewJobProps } from '@/types/task';

export default function JobUser(props: ViewJobProps) {
    return (
        <div className='flex flex-col gap-[16px]'>
            <h4 className='text-slate-900'>About the Client</h4>
            <UserProfile {...props.customer} />
        </div>
    );
}
