'use client';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Form, FormControl, FormField, FormItem } from '../../ui/form';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Megaphone, Send } from 'lucide-react';
import { Socket, io } from 'socket.io-client';
import { clientStorage } from '@/utils/storageService';
import { useRouter } from 'next/navigation';
import { Message, MessageRoomInfo } from '@/types/message';
import { instance } from '@/utils/axiosInstance';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroller';

interface SendMessage {
    content: string;
}

interface UserInfo {
    type: 'worker' | 'customer';
    firstName: string;
    imageUrl?: string;
}

export default function MessageRoom(props: { taskId: string }) {
    const router = useRouter();

    // === Rendering Task name and user data ===
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [userInfo, setUserInfo] = useState<Map<string, UserInfo>>();
    useMemo(async () => {
        try {
            const roomInfo: MessageRoomInfo = (
                await instance.get(`/v1/messages/${props.taskId}/info`)
            ).data.info;
            setTaskTitle(roomInfo.taskTitle);

            const infos = new Map<string, UserInfo>();
            infos.set(roomInfo.customer._id, {
                type: 'customer',
                firstName: roomInfo.customer.name,
                imageUrl: roomInfo.customer.imageUrl,
            });

            roomInfo.hiredWorkers.forEach(worker => {
                infos.set(worker._id, {
                    type: 'worker',
                    firstName: worker.name,
                    imageUrl: worker.imageUrl,
                });
            });

            setUserInfo(infos);
        } catch (error) {
            console.log(error);
            // router.push('/messages');
        }
    }, []);

    // === messages list ===
    // === [ {taskId, senderType, senderId, text: {title, content}}, ... ] ===
    const [messages, setMessages] = useState<Message[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const fetchMessage = async () => {
        const limit = 5;
        try {
            const oldMessagesHistory = (
                await instance.get(`/v1/messages/${props.taskId}/history`, {
                    params: {
                        page,
                        limit,
                    },
                })
            ).data.messages;
            setMessages([...messages, ...oldMessagesHistory]);
            setPage(page + 1);
            if (oldMessagesHistory.length < limit) setHasMore(false);
        } catch (error) {
            console.log(error);
            // router.push('/messages');
        }
    };
    const renderMessage = (): ReactNode => {
        return (
            <>
                {messages.map((message, index) => {
                    if (message.senderType === 'user') {
                        const senderName: string =
                            userInfo?.get(message.senderId ?? '')?.firstName ??
                            '';
                        const senderImage: string | undefined = userInfo?.get(
                            message.senderId ?? '',
                        )?.imageUrl;
                        const isSelf =
                            message.senderId === clientStorage.get().user._id;
                        return (
                            <div
                                key={message._id + index}
                                className={
                                    isSelf
                                        ? 'flex flex-row-reverse gap-x-[8px] p-[4px]'
                                        : 'flex flex-row gap-x-[8px] p-[4px]'
                                }
                            >
                                <Image
                                    className='size-[56px] rounded-full object-cover'
                                    src={senderImage ?? '/ProfilePicEmpty.png'}
                                    width={56}
                                    height={56}
                                    alt=''
                                    priority
                                ></Image>
                                <div
                                    className={
                                        isSelf
                                            ? 'bg-primary-100 rounded-xl p-2 flex flex-col items-end'
                                            : 'bg-primary-100 rounded-xl p-2 flex flex-col items-start'
                                    }
                                >
                                    <h4>{senderName}</h4>
                                    <p>{message.text.content}</p>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div className='w-full flex gap-x-[8px] p-[4px] items-center justify-center'>
                                <div className='flex flex-col justify-center w-fit px-[16px] py-[8px] gap-y-[8px] items-center bg-primary-100 rounded-sm'>
                                    <div className='flex flex-row gap-x-[8px]'>
                                        <Megaphone size={24} />
                                        <p className='font-semibold'>
                                            {message.text.title}
                                        </p>
                                    </div>
                                    <p>{message.text.content}</p>
                                </div>
                            </div>
                        );
                    }
                })}
            </>
        );
    };

    // === Connect to socket room ===
    const [isJoined, setJoined] = useState(false);
    const socketRef = useRef<Socket | null>(null);
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

            // Join socket room
            socket.emit('join_room', props.taskId);
            socket.on('join_success', () => {
                setJoined(true);
            });

            // Receiving chat
            socket.on('chat_message', (text: Message) => {
                console.log('Received message');
                console.log(text);
                setMessages(messages => [text, ...messages]);
            });

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

    // === Send message form ===
    const schema: ZodType<SendMessage> = z.object({
        content: z.string().max(255, {
            message: 'message cannot be longer than 255 characters',
        }),
    });
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            content: '',
        },
    });
    const submitData = async (values: z.infer<typeof schema>) => {
        console.log('Send message', values);
        if (!socketRef.current) return;
        socketRef.current.emit('send_message', {
            taskId: props.taskId,
            senderId: clientStorage.get().user._id,
            text: values.content,
        });
    };

    return (
        <div className='w-full h-fill'>
            <h1>{taskTitle}</h1>
            {isJoined && (
                <div className='w-full h-fill flex flex-col gap-y-[16px]'>
                    <InfiniteScroll
                        className='flex flex-col-reverse w-full h-[500px] overflow-auto'
                        pageStart={0}
                        loadMore={fetchMessage}
                        hasMore={hasMore}
                        loader={
                            <div className='loader' key={0}>
                                Loading ...
                            </div>
                        }
                    >
                        {renderMessage()}
                    </InfiniteScroll>
                    <form
                        className='flex flex-row'
                        onSubmit={form.handleSubmit(submitData)}
                    >
                        <Form {...form}>
                            <FormField
                                control={form.control}
                                name='content'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormControl className='w-full'>
                                            <Input
                                                {...form.register('content')}
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </Form>
                        <Button size='xs'>
                            <Send size={28} />
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
}