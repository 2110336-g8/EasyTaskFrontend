import { ApplyTaskResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';
export async function applyTask(
    taskId: string,
    token: string,
): Promise<ApplyTaskResponse> {
    return instance
        .post('/v1/tasks/' + taskId + '/apply')
        .then(res => {
            const result: ApplyTaskResponse = res.data;
            console.log('applying task', taskId);
            if (!result.success) {
                // setToken(result.token);
                console.log(result);
            }
            return result;
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                console.log(error.response.data);
                return error.response.data;
            } else if (error.response && error.response.status === 500) {
                console.log(error.response.data);
                return error.response.data;
            }

            // console.log(email)
            console.log(error);
            return Promise.reject('Can not fetch user');
        });
}
