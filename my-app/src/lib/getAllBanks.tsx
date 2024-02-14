import { AllBanksResponse } from '@/types/bank';
import { instance } from '@/utils/axiosInstance';

export async function getAllBanks(): Promise<AllBanksResponse> {
    return instance
        .get('/v1/banks', {})
        .then(res => {
            const result: AllBanksResponse = res.data;
            if (result.success) {
                // setToken(result.token);
                console.log('got all banks list');
            }
            return result;
        })
        .catch(error => {
            if (error.response && error.response.status === 500) {
                //Unauthorized
                console.log(error.response.data);
                return error.response.data;
            }
            console.log(error);
            return Promise.reject('Can not fetch user');
        });
}
