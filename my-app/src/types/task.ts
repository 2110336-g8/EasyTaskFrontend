export type WorkerStatusOptions = 'In Progress' | 'Completed' | 'Cancel';
export type TaskStateOptions = 'Open' | 'In Progress' | 'Completed' | 'Cancel';

export interface GeographicLocation {
    name: string;
    latitude: number;
    longitude: number;
}

export interface Worker {
    workerId: string;
    status: WorkerStatusOptions;
}

export interface Task {
    _id: string;
    title: string;
    category: string;
    description?: string;
    image?: string;
    location?: GeographicLocation;
    state: TaskStateOptions;
    wages: number;
    startDate: Date;
    endDate: Date;
    workers: number; //
    customerId: string;
    hiredWorkers: Array<Worker>;
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

//*=================Ads====================*//

export interface AdsCardProps {
    taskId: string;
    title: string;
    category: string;
    image?: string;
    location?: string;
    wages: string;
    startDate: string;
    applications: string;
}

export interface ViewAdsProps {
    taskId: string;
    title: string;
    category: string;
    image?: string;
    description?: string;
    wages: number;
    workers: number;
    location?: GeographicLocation;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    applicants: Array<Worker>;
}

export interface GetUserAdsResponse {
    count: number;
    success: boolean;
    // page: number;
    // limit: number;
    tasks: Task[];
}

//*=================Create Task====================*//

export interface CreateTasksResponse {
    task?: {
        title: string;
        category: string;
        description?: string;
        location?: GeographicLocation;
        state: TaskStateOptions;
        wages: number;
        workers: number; //
        startDate: Date;
        endDate: Date;
        customerId: string;
        _id: string;
        imageKeys?: string[];
        applicants: Array<Worker>;
        hiredWorkers: Array<Worker>;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
    };
    success?: string;
    error?: string;
}
