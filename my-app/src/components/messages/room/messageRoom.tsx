'use client';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Form, FormControl, FormField, FormItem } from '../../ui/form';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Crown, Megaphone, Send } from 'lucide-react';
import { Socket, io } from 'socket.io-client';
import { clientStorage } from '@/utils/storageService';
import { useRouter } from 'next/navigation';
import { Message, MessageRoomInfo } from '@/types/message';
import { instance } from '@/utils/axiosInstance';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroller';
import dayjs, { Dayjs } from 'dayjs';

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
            router.push('/messages');
        }
    }, []);

    // === messages list ===
    // === [ {taskId, senderType, senderId, text: {title, content}}, ... ] ===
    const [messages, setMessages] = useState<Message[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const fetchMessage = async () => {
        const limit = 32;
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
            router.push('/messages');
        }
    };

    const renderDateDivider = (currentDate: Dayjs) => {
        const currentDateString = currentDate.format('YYYY-MM-DD');
        const todayDateString = dayjs().format('YYYY-MM-DD');
        const yesterdayDateString = dayjs()
            .subtract(1, 'day')
            .format('YYYY-MM-DD');

        if (currentDateString === todayDateString) {
            return 'Today';
        } else if (currentDateString === yesterdayDateString) {
            return 'Yesterday';
        } else if (currentDate.year() === dayjs().year()) {
            return currentDate.format('ddd, DD/MM');
        } else {
            return currentDate.format('ddd, DD/MM/YYYY');
        }
    };

    const renderMessageComponent = (
        message: Message,
        nextMessage: Message | undefined,
    ) => {
        const senderName: string =
            userInfo?.get(message.senderId ?? '')?.firstName ?? '';
        const senderImage: string | undefined = userInfo?.get(
            message.senderId ?? '',
        )?.imageUrl;
        const isSelf = message.senderId !== clientStorage.get().user._id;
        const isCustomer =
            userInfo?.get(message.senderId ?? '')?.type === 'customer';
        if (message.senderType === 'user') {
            return (
                <div
                    className={
                        isSelf
                            ? 'flex flex-row-reverse gap-x-[8px] p-[4px]'
                            : 'flex flex-row gap-x-[8px] p-[4px]'
                    }
                >
                    {message.senderId !== nextMessage?.senderId ||
                    dayjs(message.sentAt).format('DDMMYYYY') !==
                        dayjs(nextMessage?.sentAt).format('DDMMYYYY') ? (
                        <Image
                            className='size-[56px] rounded-full object-cover'
                            src={senderImage ?? '/ProfilePicEmpty.png'}
                            width={56}
                            height={56}
                            alt=''
                            priority
                        ></Image>
                    ) : (
                        <div className='min-w-[56px]'></div>
                    )}
                    <div className='flex flex-col max-w-[70%]'>
                        {isSelf ||
                        (message.senderId === nextMessage?.senderId &&
                            dayjs(message.sentAt).format('DDMMYYYY') ==
                                dayjs(nextMessage?.sentAt).format(
                                    'DDMMYYYY',
                                )) ? (
                            <div />
                        ) : (
                            <div className='flex flex-row gap-[8px]'>
                                {isCustomer && (
                                    <Crown
                                        className='stroke-secondary-700 fill-secondary-500'
                                        size={24}
                                    />
                                )}
                                <p className='font-semibold'>
                                    {senderName + (isCustomer && ' (Client)')}
                                </p>
                            </div>
                        )}
                        <div
                            className={
                                isSelf
                                    ? 'flex flex-row-reverse gap-[8px] h-full'
                                    : 'flex flex-row gap-[8px]'
                            }
                        >
                            <div
                                className={
                                    isSelf
                                        ? 'bg-primary-100 rounded-xl p-2 flex flex-col items-start h-fit self-end'
                                        : 'bg-primary-100 rounded-xl p-2 flex flex-col items-end h-fit self-end'
                                }
                            >
                                <p className='text-slate-900 text-wrap break-all'>
                                    {message.text.content}
                                </p>
                            </div>
                            <div className='text-slate-400 flex items-ends'>
                                {message.sentAt && (
                                    // Extract hours and minutes from the Date object
                                    <small className='self-end pb-1'>
                                        {new Date(
                                            message.sentAt,
                                        ).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </small>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='w-full flex gap-x-[8px] p-[4px] items-center justify-center my-[8px]'>
                    <div className='flex flex-col justify-center max-w-[70%] px-[16px] py-[8px] gap-y-[8px] items-center bg-primary-100 rounded-sm border-primary-500 border-[1px]'>
                        <div className='flex flex-row gap-x-[8px]'>
                            <Megaphone size={24} />
                            <p className='font-semibold'>
                                {message.text.title}
                            </p>
                        </div>
                        {message.text.content && (
                            <p className='break-all'>{message.text.content}</p>
                        )}
                    </div>
                </div>
            );
        }
    };

    const renderMessage = (): ReactNode => {
        return (
            <>
                {messages.map((message, index) => {
                    let renderDivider = null;
                    const currentDate = dayjs(message.sentAt);
                    let nextDate: string | null = null;

                    if (index < messages.length - 1) {
                        nextDate = dayjs(messages[index + 1].sentAt).format(
                            'YYYY-MM-DD',
                        );
                    }

                    if (!nextDate) {
                        renderDivider = renderDateDivider(currentDate);
                    } else if (
                        currentDate.format('DDMMYYYY') !==
                        dayjs(nextDate).format('DDMMYYYY')
                    ) {
                        renderDivider = renderDateDivider(currentDate);
                    }

                    const nextMessage = messages.at(index + 1);
                    const messageComponent = renderMessageComponent(
                        message,
                        nextMessage,
                    );

                    return (
                        <React.Fragment key={message._id + index}>
                            {messageComponent}
                            {renderDivider && (
                                <div className='flex items-center justify-center'>
                                    <p className='text-xs font-medium text-primary-300 bg-primary-100 px-[12px] py-[4px] rounded-[20px]'>
                                        {renderDivider}
                                    </p>
                                </div>
                            )}
                        </React.Fragment>
                    );
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
                `${process.env.NEXT_PUBLIC_BACK_HOSTNAME}/messages`,
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
        content: z.string().min(1).max(255, {
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
        if (!socketRef.current) return;
        socketRef.current.emit('send_message', {
            taskId: props.taskId,
            senderId: clientStorage.get().user._id,
            text: values.content,
        });
        form.reset();
    };

    return (
        <div className='w-full flex flex-col'>
            <h1>{taskTitle}</h1>
            {isJoined && (
                <div className='w-full h-full flex flex-col gap-y-[16px]'>
                    <InfiniteScroll
                        className='flex flex-col-reverse flex-1 w-full overflow-y-auto'
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
                        className='flex flex-row gap-[8px]'
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
                                                type='search'
                                                autoComplete='off'
                                                {...form.register('content')}
                                                placeholder='Messages...'
                                                className='rounded-full h-[44px]'
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </Form>
                        <Button size='xs' className='py-[7px] px-[9px]'>
                            <Send size={28} className='stroke-white' />
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
}
