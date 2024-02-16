import { AllTasksResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';

export function getAllTasks(): Promise<AllTasksResponse> {
    return instance
        .get('/v1/tasks', {})
        .then(response => {
            return response.data as AllTasksResponse;
        })
        .catch(error => {
            if (error.response && error.response.status === 500) {
                // Unauthorized
                return error.response.data as AllTasksResponse;
            }
            // Other errors
            return Promise.reject('Can not fetch tasks');
        });
}
