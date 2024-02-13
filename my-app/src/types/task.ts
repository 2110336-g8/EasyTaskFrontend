export interface Task {
    _id: string;
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
    customerId: string;
    hiredWorkers: Array<{
        workerId: string;
        status: 'In Progress' | 'Completed' | 'Cancel';
    }>;
}

export interface AllTasksResponse {
    taskCount: number;
    success: boolean;
    currentPage: number;
    size: number;
    tasks: Task[];
}

export interface TaskCardProps {
    taskId: string;
    title: string;
    category?: string;
    image?: string;
    location?: string;
    wages: string;
    startDate: string;
    endDate: string;
    workers: string;
}

export interface ViewTaskProps {
    taskId: string;
    title: string;
    category?: string;
    image?: string;
    description?: string;
    location?: string;
    wages: string;
    startDate: string;
    endDate: string;
    workers: string;
}
