import { AllTasksResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';

export const getAllTasks = async function ({
    page = 1,
    limit = 8,
}: {
    page?: number;
    limit?: number;
}): Promise<AllTasksResponse> {
    return instance
        .post('/v1/tasks/page', { page, limit })
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
};
