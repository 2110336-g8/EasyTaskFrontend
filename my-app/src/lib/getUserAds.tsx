import { GetUserAdsResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';

export const getUserAds = async function ({
    userId,
}: {
    userId: string;
}): Promise<GetUserAdsResponse> {
    return instance
        .get(`/v1/tasks/adsOf/${userId}`)
        .then(response => {
            return response.data as GetUserAdsResponse;
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                //Unauthorized
                return error.response.data as GetUserAdsResponse;
            }
            return Promise.reject('Can not fetch user ads');
        });
};
