import React, { useState } from 'react';
import Image from 'next/image';
import { PhoneIcon, MailIcon } from 'lucide-react';
import CheckboxNumber from '@/components/candidateSelection/checkboxNumber';
import { CandidateInfo } from '@/types/task';

export default function CandidateCard(props: {
    employeeInfo: CandidateInfo;
    index: number;
    allowUpdate: boolean;
    onClick?: () => void;
}): React.JSX.Element {
    const [isHighlighted, setIsHighlighted] = useState(false);

    const handleToggle = (event: any) => {
        let target = event.target;

        while (target != null && target !== event.currentTarget) {
            if (!(target instanceof Element)) return;
            if (target.tagName === 'A' && target.getAttribute('href')) {
                return;
            }
            target = target.parentNode;
        }

        if (!props.allowUpdate) return;

        setIsHighlighted(!isHighlighted);
        if (props.onClick) props.onClick();
    };

    return (
        <div
            className={`w-[494px] h-[132px] border border-gray-300 rounded-lg p-[16px] cursor-default hover:cursor-pointer ${isHighlighted ? 'bg-slate-100' : ''}`}
            onClick={handleToggle}
        >
            <div className='flex flex-row items-start gap-[16px]'>
                {/* Image Container */}
                <figure className='w-[100px] h-[100px] flex-shrink-0'>
                    <Image
                        width={0}
                        height={0}
                        sizes='100vw'
                        src={props.employeeInfo.imageUrl || '/mocktask.png'}
                        alt=''
                        className='w-full h-full object-cover rounded-full'
                        loading='lazy'
                    />
                </figure>

                {/* Text Area - Adjusted to take up remaining space */}
                <section className='flex-grow flex flex-col gap-[8px]'>
                    <h4 className='text-slate-900 line-clamp-2 break-words py-[6px]'>
                        <a
                            href={`/profile/${props.employeeInfo.userId}`}
                            className='hover:underline'
                        >
                            {`${props.employeeInfo.firstName} ${props.employeeInfo.lastName}`}
                        </a>
                    </h4>
                    <div className='flex flex-col gap-[4px]'>
                        <small className='w-full gap-[4px] flex items-center text-slate-500'>
                            <PhoneIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                            {props.employeeInfo.phoneNumber ? (
                                <a
                                    href={`tel:${props.employeeInfo.phoneNumber}`}
                                    className='hover:underline'
                                >
                                    {props.employeeInfo.phoneNumber}
                                </a>
                            ) : (
                                '-'
                            )}
                        </small>
                        <small className='w-full gap-[4px] flex items-center text-slate-500'>
                            <MailIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                            <a
                                href={`mailto:${props.employeeInfo.email}`}
                                className='hover:underline'
                            >
                                {props.employeeInfo.email}
                            </a>
                        </small>
                    </div>
                </section>

                {/* Checkbox - Rightmost Side */}
                <section className='flex-shrink-0 translate-x-[8px] -translate-y-[8px]'>
                    <CheckboxNumber num={props.index ? props.index : 0} />
                </section>
            </div>
        </div>
    );
}
