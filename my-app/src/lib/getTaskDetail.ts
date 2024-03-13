import { instance } from '@/utils/axiosInstance';
import { TaskDetailResponse } from '@/types/task';

export async function getTaskDetail(
    taskId: string,
): Promise<TaskDetailResponse> {
    return instance
        .get(`/v1/tasks/${taskId}`)
        .then(res => {
            const result: TaskDetailResponse = res.data;
            return result;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
