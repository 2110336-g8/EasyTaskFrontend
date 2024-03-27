import { GetUserAdsResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';

export const getUserAds = async function ({
    userId,
    status,
}: {
    userId: string;
    status: string;
}): Promise<GetUserAdsResponse> {
    return instance
        .get(`/v1/tasks/adsOf/${userId}?status=${status}`)
        .then(response => {
            return response.data as GetUserAdsResponse;
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                //Unauthorized
                return error.response.data as GetUserAdsResponse;
            }
            return Promise.reject('Can not fetch user ads');
        });
};
