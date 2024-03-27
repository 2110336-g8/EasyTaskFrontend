import MessageRoom from '@/components/messages/room/messageRoom';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MessageRoomPage({
    params,
}: {
    params: { taskId: string };
}) {
    return (
        <div className='w-full h-full flex flex-row gap-x-[40px]'>
            <Link href='/messages' className='pt-[8px]'>
                <ArrowLeft size={40}></ArrowLeft>
            </Link>
            <MessageRoom taskId={params.taskId}></MessageRoom>
        </div>
    );
}
