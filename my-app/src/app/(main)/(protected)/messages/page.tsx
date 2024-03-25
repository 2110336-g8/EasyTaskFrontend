'use client';
import MessagePreviewBox, {
    MessagePreview,
} from '@/components/messages/messagePreview';
import { instance } from '@/utils/axiosInstance';
import { clientStorage } from '@/utils/storageService';
import { useRef, useEffect, useState, useMemo } from 'react';
import { Socket, io } from 'socket.io-client';

export default function Inbox() {
    const socketRef = useRef<Socket | null>(null);
    const [activeRooms, setActiveRooms] = useState<MessagePreview[]>([]);
    const [archivedRooms, setArchivedRooms] = useState<MessagePreview[]>([]);

    useEffect(() => {
        const setupSocket = () => {
            const socket = io(
                `${process.env.NEXT_PUBLIC_BACK_HOSTNAME}messages`,
                {
                    auth: {
                        token: clientStorage.get().token,
                    },
                },
            );
            socketRef.current = socket;

            socket.on('chat_message', async () => {});

            return () => {
                socket.disconnect();
            };
        };

        setupSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    useMemo(async () => {
        try {
            const messagePreviewInfos = await instance.get(`/v1/messages/`);
            console.log(messagePreviewInfos.data);
            setActiveRooms(messagePreviewInfos.data.messagesRooms.activeRooms);
            setArchivedRooms(
                messagePreviewInfos.data.messagesRooms.archivedRooms,
            );
        } catch (error) {
            console.log(error);
        }
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
