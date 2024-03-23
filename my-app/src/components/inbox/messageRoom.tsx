'use client';
import React, {
    ReactNode,
    use,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { Socket, io } from 'socket.io-client';
import { clientStorage } from '@/utils/storageService';
import { useRouter } from 'next/navigation';
import { Message, MessageRoomInfo } from '@/types/message';
import { instance } from '@/utils/axiosInstance';
import Image from 'next/image';
import { render } from 'react-dom';

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

    // === messages list ===
    // === [ {taskId, senderType, senderId, text: {title, content}}, ... ] ===
    const [messages, setMessages] = useState<Message[]>([]);
    const [isJoined, setJoined] = useState(false);

    // === Connet to socket room ===
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        const setupSocket = () => {
            const socket = io('localhost:5001/chats', {
                auth: {
                    token: clientStorage.get().token,
                },
            });
            socketRef.current = socket;
            socket.emit('join_room', props.taskId);

            socket.on('join_success', () => {
                console.log('Joined room successfully');
                setJoined(true);
            });
            socket.on('join_error', (error: string) => {
                // router.push('/inbox');
            });

            socket.on('chat_message', (text: Message) => {
                console.log('Received message');
                console.log(text);
                setMessages(messages => [text, ...messages]);
            });

            socket.on('connect_error', err => {
                console.log(err.message);
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

    // === Fetch Task and user data (including imgURL) ===
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
            console.error('Error fetching task data:', error);
        }
    }, []);

    // === Fetch messages history (only last 16 for now, you might wnat to create a function that able to use pagination, API doc in notion)===
    useMemo(async () => {
        const oldMessagesHistory = (
            await instance.get(`/v1/messages/${props.taskId}/history`)
        ).data.messages;
        setMessages(oldMessagesHistory);
    }, []);

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
        console.log('Send messsage', values);
        if (!socketRef.current) return;
        socketRef.current.emit('send_message', {
            taskId: props.taskId,
            senderId: clientStorage.get().user._id,
            text: values.content,
        });
    };

    const renderMessage = (): ReactNode => {
        const rendered: ReactNode[] = [];
        for (let message of messages) {
            // TO DO
            // PUSH React node (e.g. <div></div>) into the rendered array including
            //  - Date/Day seperator e.g. <div>Today</div> (look in figma for clearify)
            //  - User Profile and FirstName
            //  - Message
            //  - System Message
            //
            // Note
            // type of message is Message (look for fields in types/message.ts)
            // already fetch user info as state (map from user_id: string -> info: UserInfo)
            // Type UserInfo is declared in the top of this file
            const senderName: string =
                userInfo?.get(message.senderId ?? '')?.firstName ?? '';
            const senderImage: string | undefined = userInfo?.get(
                message.senderId ?? '',
            )?.imageUrl;

            rendered.push(
                <div key={message._id}>
                    <Image
                        className='size-[56px] rounded-full object-cover'
                        src={senderImage ?? '/ProfilePicEmpty.png'}
                        width={56}
                        height={56}
                        alt=''
                        priority
                    ></Image>
                    <h3>{senderName}</h3>
                    <p>{message.text.content}</p>
                </div>,
            );
        }
        return <>{rendered}</>;
    };

    return (
        <div className='w-full h-full'>
            <h1>{taskTitle}</h1>
            <div className='w-full h-full flex flex-col gap-y-[16px]'>
                {/* TO DO : Infinite scoll pane*/}
                <div className='flex flex-col-reverse w-full h-[500px] bg-slate-200 round'>
                    {renderMessage()}
                </div>
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
        </div>
    );
}
