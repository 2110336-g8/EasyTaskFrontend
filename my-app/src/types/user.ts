export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    imageUrl?: string;
    bankId?: string;
    bankAccName?: string;
    bankAccNo?: string;
}

export interface UserProfile {
    _id: string; // need for testing / validating in profile
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    imageKey?: string;
    imageUrl?: string;
    bankId?: string;
    bankAccName?: string;
    bankAccNo?: string;
    applications: Array<{
        taskId: string;
        status: 'Pending' | 'Accepted' | 'Rejected' | 'Cancel';
        createdAt: Date;
    }>;
    tasks: Array<{
        taskId: string;
        status: 'InProgress' | 'Completed' | 'Cancel';
        createdAt: Date;
    }>;
    ownedTasks: string[];
}

export interface UserCard {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl?: string;
    phoneNumber?: string;
}
