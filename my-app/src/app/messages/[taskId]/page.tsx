'use client';

import MessageRoom from '@/components/messages/room/messageRoom';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MessageRoomPage({
    params,
}: {
    params: { taskId: string };
}) {
    const router = useRouter();

    return (
        <div className='w-full h-full flex flex-row gap-x-[40px]'>
            <a onClick={() => router.back()} className='pt-[8px]'>
                <ArrowLeft size={40}></ArrowLeft>
            </a>
            <MessageRoom taskId={params.taskId}></MessageRoom>
        </div>
    );
}
