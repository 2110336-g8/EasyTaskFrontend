export interface Task {
    _id: string;
    title: string;
    category: string;
    description?: string;
    image?: string;
    location?: {
        name: string;
        latitude: number;
        longitude: number;
    };
    state: 'Open' | 'In Progress' | 'Completed' | 'Cancel';
    wages: number;
    startDate: Date;
    endDate: Date;
    workers: number; //
    customerId: string;
    hiredWorkers: Array<{
        workerId: string;
        status: 'In Progress' | 'Completed' | 'Cancel';
    }>;
    createdAt: Date;
    updatedAt: Date;
}

export interface AllTasksResponse {
    count: number;
    success: boolean;
    page: number;
    limit: number;
    tasks: Task[];
}

export interface GetCategoriesResponse {
    success: boolean;
    categories: string[];
}

export interface TaskCardProps {
    taskId: string;
    title: string;
    category: string;
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
    category: string;
    image?: string;
    description?: string;
    location?: string;
    wages: string;
    startDate: string;
    endDate: string;
    workers: string;
}

//*=================Create Task====================*//

export interface CreateTasksResponse {
    task?: {
        title: string;
        category: string;
        description?: string;
        location?: {
            name: string;
            latitude: number;
            longitude: number;
        };
        state: 'Open' | 'In Progress' | 'Completed' | 'Cancel';
        wages: number;
        workers: number; //
        startDate: Date;
        endDate: Date;
        customerId: string;
        _id: string;
        imageKeys?: string[];
        applicants: Array<{
            workerId: string;
            status: 'In Progress' | 'Completed' | 'Cancel';
        }>;
        hiredWorkers: Array<{
            workerId: string;
            status: 'In Progress' | 'Completed' | 'Cancel';
        }>;
        createdAt: Date;
        updatedAt: Date;
        __v: number
    }
    success?: string;
    error?:string
}