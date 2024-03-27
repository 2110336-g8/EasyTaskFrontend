import { GetUserJobsResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';

export const getUserJobs = async function ({
    userId,
    status,
}: {
    userId: string;
    status: string;
}): Promise<GetUserJobsResponse> {
    return instance
        .get(`/v1/tasks/tasksOf/${userId}?status=${status}`)
        .then(response => {
            return response.data as GetUserJobsResponse;
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                //Unauthorized
                return error.response.data as GetUserJobsResponse;
            }
            return Promise.reject('Can not fetch user ads');
        });
};
