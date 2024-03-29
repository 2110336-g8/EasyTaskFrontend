import { Dayjs } from 'dayjs';
import { User } from './user';

export enum WorkerStatusOptions {
    INPROGRESS = 'InProgress',
    SUBMITTED = 'Submitted',
    REVISING = 'Revising',
    RESUBMITTED = 'Resubmitted',
    COMPLETED = 'Completed',
    DISMISSED = 'Dismissed',
}

export enum ApplicantStatusOptions {
    PENDING = 'Pending',
    OFFERING = 'Offering',
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
    NOTPROCEED = 'NotProceed',
}

export enum TaskStateOptions {
    OPEN = 'Open',
    INPROGRESS = 'InProgress',
    DISMISSED = 'Dismissed',
    COMPLETED = 'Completed',
}

export enum AdsStateOptions {
    OPEN = 'Open',
    INPROGRESS = 'InProgress',
    CLOSED = 'Closed',
    COMPLETED = 'Completed',
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
    customerId: string;
    applicants: Applicant[];
    hiredWorkers: Worker[];
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
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

export interface JobDetailResponse extends TaskDetailResponse {
    customerInfo: User;
    status: JobStatusOptions;
}

export enum JobStatusOptions {
    //========OPEN========//
    OPEN = 'Open',
    PENDING = 'Pending',
    OFFERING = 'Offering',
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
    NOTPROCEED = 'NotProceed',
    //========INPROGRESS========//
    INPROGRESS = 'InProgress',
    SUBMITTED = 'Submitted',
    REVISING = 'Revising',
    RESUBMITTED = 'Resubmitted',
    //========DISMISSED========//
    DISMISSED = 'Dismissed',
    //========COMPLETED========//
    COMPLETED = 'Completed',
}

export interface AdsDetailResponse extends TaskDetailResponse {
    applicantsInfo?: (Applicant | User)[];
    hiredWorkersInfo?: (Worker | User)[];
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
    viewType: 'job' | 'ads';
    taskId: string;
    title: string;
    category: string;
    imageUrl?: string;
    description?: string;
    location?: GeographicLocation;
    wages: string;
    startDate: Dayjs;
    endDate: Dayjs;
    workers: string;
    posted: string;
    status: TaskStateOptions;
}
export interface ViewJobProps extends ViewTaskProps {
    customer: ProfileProps;
    jobStatus: JobStatusOptions;
}

export interface ViewAdsProps extends ViewTaskProps {
    applicants: ApplicantProps[];
    pendingApplicants: ApplicantProps[];
    acceptApplicants: ApplicantProps[];
    offeringApplicants: ApplicantProps[];
    hiredWorkers: WorkerProps[];
}
export interface ProfileProps {
    _id: string;
    name: string;
    image?: string;
    phoneNumber?: string;
}

export interface ApplicantProps extends ProfileProps {
    status: ApplicantStatusOptions;
}
export interface WorkerProps extends ProfileProps {
    status: WorkerStatusOptions;
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
    applications: Applicant[];
    hiredworkersNumber?: number;
    status: string;
    buttonFunc?: string;
}

// export interface ViewAdsProps {
//     taskId: string;
//     title: string;
//     category: string;
//     image?: string;
//     description?: string;
//     wages: number;
//     workers: number;
//     location?: GeographicLocation;
//     startDate: Date;
//     endDate: Date;
//     createdAt: Date;
//     applicants: Array<Applicant>;
// }

export interface GetUserAdsResponse {
    count?: number;
    success?: boolean;
    error?:boolean
    // page: number;
    // limit: number;
    tasks: Task[];
}

export interface CandidatesOfTask {
    taskId: string;
    capacity: number;
    vacancy: number;
    candidates: {
        pending: Array<CandidateInfo>;
        offering: Array<CandidateInfo>;
        accepted: Array<CandidateInfo>;
    };
}

export interface CandidateInfo {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl?: string;
    phoneNumber?: string;
    appliedAt: Date;
}

//*=================Jobs====================*//
export interface JobsCardProps {
    taskId: string;
    title: string;
    category: string;
    imageUrl?: string;
    locationName?: string;
    wages: string;
    startDate: string;
    endDate: string;
    applicationNumber: string;
    taskStatus?: string;
}

export interface UserJobsProps {
    status: string;
    tasks: JobsCardProps[];
}

export interface GetUserJobsResponse {
    enrolled_tasks?: UserJobsProps[];
    error?: string;
}

//==========Task Management==============//
export interface ApplyTaskResponse {
    success: boolean;
    result?: Task;
    error?: string;
}

export interface AcceptOfferResponse {
    success: boolean;
    error?: string;
}
export interface RejectOfferResponse {
    success: boolean;
    error?: string;
}

export interface SubmitTaskResponse {
    success: boolean;
    error?: string;
}

export interface StartTaskResponse {
    success: boolean;
    result?: Task;
    error?: string;
}

export interface DismissTaskResponse {
    success: boolean;
    result?: Task;
    error?: string;
}

export interface AcceptTaskResponse {
    success: boolean;
    result?: Task;
    error?: string;
}

export interface ReviseTaskResponse {
    success: boolean;
    result?: Task;
    error?: string;
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
