export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    photoURL?: string;
    bankId?: string;
    bankAccName?: string;
    bankAccNo?: string;
}

export interface UserProfile {
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
        status: 'In Progress' | 'Completed' | 'Cancel';
        createdAt: Date;
    }>;
    ownedTasks: string[]; 
}