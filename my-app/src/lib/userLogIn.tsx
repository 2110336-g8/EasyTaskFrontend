import { LoginResponse } from '@/types/auth';
import { instance } from '@/utils/axiosInstance';
import { clientStorage } from '@/utils/storageService';
import jwt_decode, { jwtDecode } from 'jwt-decode';

export async function userLogIn(
    email: string,
    password: string,
): Promise<LoginResponse> {
    return instance
        .post('/v1/auth/login', { email, password })
        .then(res => {
            const result: LoginResponse = res.data;
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
            if (error.response && error.response.status === 401) {
                // Unauthorized
                return error.response.data;
            }
            return Promise.reject("Can't fetch user!");
        });
}

export const isTokenExpired = (token: string): boolean => {
    const decodedToken = jwtDecode(token);
    if (!decodedToken) {
        return true;
    }
    const expiryTimeInSeconds = decodedToken.exp;
    if (!expiryTimeInSeconds) {
        return true;
    }
    return expiryTimeInSeconds * 1000 < Date.now();
};
