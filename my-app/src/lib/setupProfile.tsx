import { instance } from '@/utils/axiosInstance';
import { clientStorage } from '@/utils/storageService';
import { ProfileResponse } from '@/types/profile';

export async function setupProfile(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phoneNumber: string,
    bankName: string,
    bankAccName: string,
    bankAccNo: string,
): Promise<ProfileResponse> {
    return instance
        .post('/v1/auth/register', { email, firstName, lastName, password,phoneNumber,bankName,bankAccName,bankAccNo })
        .then(res => {
            const result: ProfileResponse = res.data;
            if (result.success) {
                // Authorized
                clientStorage.set({
                    token: result.token,
                    user: result.user,
                });
            }
            return result;
        })
        .catch(error => {
            if (error.response && error.response.status === 403 || error.response && error.response.status === 400) {
                // Unauthorized
                return error.response.data;
            }
            return Promise.reject("Can't fetch user!");
        });
}
