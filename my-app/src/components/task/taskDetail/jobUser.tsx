'use client';

import { ViewTaskProps } from '@/types/task';
import ClientProfile from '@/components/ui/clientProfile';

export default function JobUser(props: ViewTaskProps) { // Is this correct TYPE ???
    return (
        <div className='flex flex-col gap-[16px]'>
            <h4>About the Client</h4>
            <ClientProfile {...props.customer} />
        </div>
    );
}
