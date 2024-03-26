import { ApplyTaskResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';
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
