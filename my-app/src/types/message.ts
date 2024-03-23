export interface Message {
    _id: string;
    taskId: string;
    senderType: 'sys' | 'user';
    senderId?: string;
    text: {
        title?: string;
        content?: string;
    };
}

export interface MessageRoomInfo {
    taskId: string;
    taskTitle: string;
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
