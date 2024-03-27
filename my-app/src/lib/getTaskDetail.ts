import { instance } from '@/utils/axiosInstance';
import { AdsDetailResponse, JobDetailResponse } from '@/types/task';

export async function getTaskDetail(
    taskId: string,
): Promise<JobDetailResponse | AdsDetailResponse> {
    return instance
        .get(`/v1/tasks/${taskId}`)
        .then(res => {
            const result: JobDetailResponse | AdsDetailResponse = res.data;
            return result;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
