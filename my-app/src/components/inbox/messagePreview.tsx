import { Message } from '@/types/message';
import { dateFromString, dateToString } from '@/utils/datetime';
import Image from 'next/image';
import Link from 'next/link';

export interface MessagePreview {
    _id: string;
    taskTitle: string;
    imageUrl?: string;
    latestMessage?: MessagePreviewInfo;
    unreadCount: number;
    disabled: boolean;
}

export interface MessagePreviewInfo {
    senderName: string;
    message: string;
    sentAt: Date;
}

export default function MessagePreviewBox(props: MessagePreview) {
    return (
        <Link
            href={`messages/${props._id}`}
            className={`w-full flex flex-row gap-x-[16px] px-[16px] py-[4px] ${props.disabled ? 'pointer-events-none' : ''}`}
        >
            <Image
                className='w-[160px] h-[90px] rounded-[6px] object-cover'
                src={props.imageUrl || '/mocktask.png'}
                alt={''}
                width={160}
                height={90}
                priority
            />
            <div className='flex flex-col gap-y-[8px] justify-center'>
                <h3>{props.taskTitle}</h3>
                <p className='font-medium text-slate-600'>
                    {props.latestMessage?.senderName +
                        ': ' +
                        props.latestMessage?.message +
                        ' · ' +
                        dateToString(
                            dateFromString(
                                props.latestMessage?.sentAt.toString() ?? '',
                            ),
                        )}
                </p>
            </div>
        </Link>
    );
}
