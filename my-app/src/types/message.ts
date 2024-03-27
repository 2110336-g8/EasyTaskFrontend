import { Task } from './task';

export interface Message {
    _id: string;
    taskId: string;
    senderType: 'sys' | 'user';
    senderId?: string;
    text: {
        title?: string;
        content?: string;
    };
    sentAt: string;
}

export interface MessageRoomInfo {
    task: Task;
    customer: {
        _id: string;
        name: string;
        imageUrl: string;
    };
    hiredWorkers: {
        _id: string;
        name: string;
        imageUrl: string;
    }[];
}
