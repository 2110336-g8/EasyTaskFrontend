import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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

function trimMessage(message: string): string {
    if (message.length > 32) {
        return message.substring(0, 32) + '...';
    }
    return message;
}

export default function MessagePreviewBox(props: MessagePreview) {
    return (
        <Link
            href={`messages/${props._id}`}
            className={`w-full flex flex-row px-[16px] py-[4px] justify-between items-center ${props.disabled ? 'pointer-events-none' : ''}`}
        >
            <div className='flex flex-row gap-x-[16px]'>
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
                            trimMessage(props.latestMessage?.message ?? '') +
                            ' · ' +
                            dayjs(
                                props.latestMessage?.sentAt.toString(),
                            ).fromNow()}
                    </p>
                </div>
            </div>
            {props.unreadCount > 0 && (
                <div className='min-w-[32px] h-[32px] flex items-center justify-center bg-primary-500 rounded-full'>
                    <p className='text-white font-semibold'>
                        {props.unreadCount}
                    </p>
                </div>
            )}
        </Link>
    );
}
