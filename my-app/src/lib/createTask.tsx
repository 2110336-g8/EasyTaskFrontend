import { CreateTasksResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';

export async function otpVerification(
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    workers: number,
    wages: number,
    category: string,
    location: {
        name: string;
        latitude: number;
        longitude: number;
    },
): Promise<CreateTasksResponse> {
    return instance
        .post('/v1/tasks', {
            title,
            description,
            startDate,
            endDate,
            workers,
            wages,
            category,
            location,
        })
        .then(res => {
            const result: CreateTasksResponse = res.data;
            console.log('posting task', title);
            if (!result.success) {
                // setToken(result.token);
                console.log(result.error);
            }
            return result;
        })
        .catch(error => {
            if (error.response && error.response.status === 204) {
                console.log(error.response.data);
                return error.response.data;
            }

            // console.log(email)
            console.log(error);
            return Promise.reject('Can not fetch user');
        });
}
