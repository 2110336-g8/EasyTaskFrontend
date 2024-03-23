'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { Socket, io } from 'socket.io-client';
import { clientStorage } from '@/utils/storageService';
import { set } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Task } from '@/types/task';

interface Message {
    content: string;
}
export default function MessageRoom(props: { taskId: string }) {
    const router = useRouter();

    // === Rendering Task name and user data ===
    const [taskName, setTaskName] = useState<string>('');

    // === messages list ===
    // === [ {taskId, senderType, senderId, text: {title, content}}, ... ] ===
    const [messages, setMessages] = useState<string[]>([]);
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
                setJoined(true);
            });
            socket.on('join_error', (error: string) => {
                // router.push('/inbox');
            });

            socket.on('chat_message', (text: string) => {
                console.log('Received message');
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
    useEffect(() => {}, []);

    const schema: ZodType<Message> = z.object({
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
            text: values.content,
        });
    };

    return (
        <div className='w-full h-full'>
            {isJoined && (
                <>
                    <div className='flex flex-col-reverse'>
                        {messages.map(message => (
                            <p>{message}</p>
                        ))}
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
                </>
            )}
        </div>
    );
}
