import { Message } from '@/types/message';
import Image from 'next/image';
import Link from 'next/link';

export interface MessagePreview {
    _id: string;
    taskTitle: string;
    imageUrl?: string;
    latestMessage?: MessagePreviewInfo;
    unreadCount: number;
}

export interface MessagePreviewInfo {
    senderName: string;
    message: string;
    sentAt: Date;
}

export default function MessagePreviewBox(props: MessagePreview) {
    return (
        <Link
            href={`inbox/${props._id}`}
            className='w-full flex flex-row gap-x-[8px]'
        >
            <Image
                src={props.imageUrl || '/mocktask.png'}
                alt={''}
                width={160}
                height={90}
                priority
            />
            <div className='flex flex-col gap-y-[8px]'>
                <h2>{props.taskTitle}</h2>
                <p>
                    {props.latestMessage?.senderName +
                        ': ' +
                        props.latestMessage?.message +
                        ' ' +
                        typeof props.latestMessage?.sentAt}
                </p>
            </div>
            <div>
                <p className='text-slate-500'>{props.unreadCount}</p>
            </div>
        </Link>
    );
}
