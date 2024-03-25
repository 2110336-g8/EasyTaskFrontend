import { User } from './user';

export enum WorkerStatusOptions {
    INPROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    CANCELED = 'Cancel',
}

export enum ApplicantStatusOptions {
    PENDING = 'Pending',
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
    CANCELED = 'Cancel',
}

export enum TaskStateOptions {
    OPEN = 'Open',
    INPROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    CLOSED = 'Closed',
}

export interface GeographicLocation {
    name: string;
    latitude: number;
    longitude: number;
}

export interface Worker {
    createdAt: Date;
    status: WorkerStatusOptions;
    userId: string;
    _id: string;
}

export interface Applicant {
    createdAt: Date;
    status: ApplicantStatusOptions;
    userId: string;
    _id: string;
}

export interface Task {
    _id: string;
    title: string;
    category: string;
    description?: string;
    imageUrl?: string;
    location?: GeographicLocation;
    status: TaskStateOptions;
    wages: number;
    startDate: Date;
    endDate: Date;
    workers: number;
    customerId: User;
    applicants: Applicant[];
    hiredWorkers: Worker[];
    createdAt: Date;
    updatedAt: Date;
    __v?: number
}

export interface TaskKV {
    [id: string]: Task;
}

export interface AllTasksResponse {
    count: number;
    success: boolean;
    page: number;
    limit: number;
    tasks: Task[];
}

export interface TaskDetailResponse {
    task: Task;
}

export interface GetCategoriesResponse {
    success: boolean;
    categories: string[];
}

export interface TaskCardProps {
    taskId: string;
    title: string;
    category: string;
    imageUrl?: string;
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
    imageUrl?: string;
    description?: string;
    location?: GeographicLocation;
    wages: string;
    startDate: string;
    endDate: string;
    workers: string;
    posted: string;
    customer: {
        name: string;
        image?: string;
        phoneNumber?: string;
    };
}

//*=================Ads====================*//

export interface AdsCardProps {
    taskId: string;
    title: string;
    category: string;
    imageUrl?: string;
    location?: string;
    wages: string;
    startDate: string;
    endDate: string;
    applications: string;
    hiredworkersNumber?: number;
    status: string;
    buttonFunc?: string;
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
    applicants: Array<Applicant>;
}

export interface GetUserAdsResponse {
    count: number;
    success: boolean;
    // page: number;
    // limit: number;
    tasks: Task[];
}

export interface ApplyTaskResponse {
    success: boolean;
    result?: {
        _id: string;
        title: string;
        category: string;
        description: string;
        location: GeographicLocation;
        status: TaskStateOptions;
        wages: number;
        workers: number; //
        startDate: Date;
        endDate: Date;
        customerId: string;
        imageKeys?: string[];
        createdAt: Date;
        updatedAt: Date;
        __v: number;
    };
    error?:string;
    
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

export interface UploadTaskImageResponse {
    message?: string;
}

//*=================Cancel Task====================*//

export interface CancelTaskResponse {
    success: boolean;
    task?: Task;
    error?: string;
}