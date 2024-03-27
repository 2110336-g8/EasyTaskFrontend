import { AcceptOfferResponse, ApplyTaskResponse, DismissTaskResponse, RejectOfferResponse, StartTaskResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';

//======================JOB============================//
export async function applyTask(
    taskId: string,
): Promise<ApplyTaskResponse> {
    return instance
        .post('/v1/tasks/' + taskId + '/apply')
        .then(res => {
            const result: ApplyTaskResponse = res.data;
            return result;
        })
        .catch(error => {
            return Promise.reject(error.response.data.error);
        });
}

export async function acceptOffer(
    taskId: string,
): Promise<AcceptOfferResponse> {
    return instance
        .post('/v1/tasks/' + taskId + '/accept-offer')
        .then(res => {
            const result: AcceptOfferResponse = res.data;
            return result;
        })
        .catch(error => {
            return Promise.reject(error.response.data.error);
        });
}

export async function rejectOffer(
    taskId: string,
): Promise<RejectOfferResponse> {
    return instance
        .post('/v1/tasks/' + taskId + '/reject-offer')
        .then(res => {
            const result: RejectOfferResponse = res.data;
            return result;
        })
        .catch(error => {
            return Promise.reject(error.response.data.error);
        });
}

//======================ADS==========================//

export async function startTask(
    taskId: string,
): Promise<StartTaskResponse> {
    return instance
        .post('/v1/tasks/' + taskId + '/start')
        .then(res => {
            const result: StartTaskResponse = res.data;
            return result;
        })
        .catch(error => {
            return Promise.reject(error.response.data.error);
        });
}

export async function dismissTask(
    taskId: string,
): Promise<DismissTaskResponse> {
    return instance
        .post('/v1/tasks/' + taskId + '/dismiss')
        .then(res => {
            const result: DismissTaskResponse = res.data;
            return result;
        })
        .catch(error => {
            return Promise.reject(error.response.data.error);
        });
}