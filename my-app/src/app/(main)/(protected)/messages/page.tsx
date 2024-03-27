'use client';
import MessagePreviewBox, {
    MessagePreview,
} from '@/components/messages/messagePreview';
import { instance } from '@/utils/axiosInstance';
import { useState, useMemo, useEffect } from 'react';

export default function Inbox() {
    const [activeRooms, setActiveRooms] = useState<MessagePreview[]>([]);
    const [archivedRooms, setArchivedRooms] = useState<MessagePreview[]>([]);

    const fetchRoomsData = async () => {
        try {
            const messagePreviewInfos = await instance.get(`/v1/messages/`);
            setActiveRooms(messagePreviewInfos.data.messagesRooms.activeRooms);
            setArchivedRooms(
                messagePreviewInfos.data.messagesRooms.archivedRooms,
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRoomsData();
        const intervalId = setInterval(fetchRoomsData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='flex flex-col gap-y-[40px]'>
            <h1>Messages</h1>
            {activeRooms.length === 0 && (
                <h4 className='w-full text-center'>
                    You have no active message rooms yet.
                </h4>
            )}
            <div className='flex flex-col gap-y-[16px]'>
                {activeRooms.map(room => (
                    <MessagePreviewBox
                        disabled={false}
                        key={room._id}
                        _id={room._id}
                        taskTitle={room.taskTitle}
                        imageUrl={room.imageUrl}
                        latestMessage={room.latestMessage}
                        unreadCount={room.unreadCount}
                    ></MessagePreviewBox>
                ))}
                <hr></hr>
                {archivedRooms.length > 0 && (
                    <>
                        <p className='font-medium text-slate-400 px-[16px] py-[8px]'>
                            Archived
                        </p>
                        {archivedRooms.map(room => {
                            return (
                                <MessagePreviewBox
                                    disabled={true}
                                    key={room._id}
                                    _id={room._id}
                                    taskTitle={room.taskTitle}
                                    imageUrl={room.imageUrl}
                                    latestMessage={room.latestMessage}
                                    unreadCount={room.unreadCount}
                                ></MessagePreviewBox>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}
