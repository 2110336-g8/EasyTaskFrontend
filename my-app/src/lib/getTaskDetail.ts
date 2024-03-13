import { instance } from '@/utils/axiosInstance';
import { TaskDetailResponse } from '@/types/task';

export async function getTaskDetail(
    taskId: string,
): Promise<TaskDetailResponse> {
    return instance
        .get(`/v1/tasks/${taskId}`)
        .then(res => {
            const result: TaskDetailResponse = res.data;

            if (res.status !== 200)
                return Promise.reject(
                    'You do not have access to this resource',
                );

            console.log(taskId);
            console.log(result);
            return result;
        })
        .catch(err => {
            console.log(err);
            return Promise.reject('Cannot fetch task details');
        });
}
