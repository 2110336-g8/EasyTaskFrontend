import { CancelTaskResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';
export async function cancelTask(
    cancelTaskId: string,
): Promise<CancelTaskResponse> {
    return instance
        .post('/v1/tasks/' + cancelTaskId + '/cancel')
        .then(res => {
            const result: CancelTaskResponse = res.data;
            console.log('canceling task', cancelTaskId);
            if (!result.success) {
                console.log(result);
            }
            return result;
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                console.log(error.response.data);
                return error.response.data;
            }

            // console.log(email)
            console.log(error);
            return Promise.reject('Can not fetch user');
        });
}
