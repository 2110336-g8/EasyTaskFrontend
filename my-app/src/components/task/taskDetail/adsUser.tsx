'use client';

import { ViewAdsProps, ViewTaskProps } from '@/types/task';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

export default function AdsUser(props: ViewAdsProps) {
    console.log(props);
    return (
        <div className='flex flex-col gap-[16px]'>
            <h4>Candidate Applications ({props.applicants?.length})</h4>

            <div className='grid grid-cols-5 gap-4'>
                {props.applicants?.map(applicant => (
                    <Avatar
                        key={applicant._id}
                        style={{ width: '56px', height: '56px' }}
                    >
                        <AvatarImage
                            src={applicant.image}
                            alt='@shadcn'
                        />
                        <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                ))}
            </div>
        </div>
    );
}
