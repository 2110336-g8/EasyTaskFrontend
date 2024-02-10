export interface Task {
    taskId: string;
    title: string;
    category?: string;
    description?: string;
    image?: string;
    location?: string;
    state: 'New' | 'In Progress' | 'Completed' | 'Cancel';
    wages: number;
    startDate: Date;
    endDate: Date;
    workers: number; //
    customerID: string;
    hiredWorkers: Array<{
        workerId: string;
        status: 'In Progress' | 'Completed' | 'Cancel';
    }>;
}
export interface TaskCardProps {
    taskId: string;
    title: string;
    category?: string;
    image?: string;
    location?: string;
    wages: number;
    startDate: string;
    endDate: string;
    workers: number;
}
