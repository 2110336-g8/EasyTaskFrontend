import { instance } from '@/utils/axiosInstance';
import { CandidatesOfTask } from '@/types/task';

export async function getCandidatesOfTask(
    taskId: string,
): Promise<CandidatesOfTask> {
    return instance
        .get(`/v1/tasks/${taskId}/candidates`)
        .then(res => {
            const result: CandidatesOfTask = res.data;
            return result;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
