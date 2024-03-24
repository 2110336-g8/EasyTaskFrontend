import MessageRoom from '@/components/inbox/room/messageRoom';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MessageRoomPage({
    params,
}: {
    params: { taskId: string };
}) {
    return (
        <div className='w-full h-fit flex flex-row gap-x-[40px]'>
            <Link href='/messages'>
                <ArrowLeft size={40}></ArrowLeft>
            </Link>
            <div className='w-full h-fit flex flex-col gap-y-[16px]'>
                <MessageRoom taskId={params.taskId}></MessageRoom>
            </div>
        </div>
    );
}
