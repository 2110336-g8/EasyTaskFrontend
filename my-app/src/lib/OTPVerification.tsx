import { instance } from '@/utils/axiosInstance';
import { OtpResponse } from '@/types/otp';

export async function otpVerification(
    email: string, 
    otp: string,
    ): Promise<OtpResponse> {
    return instance.post("/v1/auth/sendOtp", { email, otp })
        .then((res) => {
            const result: OtpResponse = res.data;
            if (result.success) {
                // setToken(result.token);
                console.log(result.message)
            }
            return result;
        })
        .catch((error) => {
            if (error.response && error.response.status === 400){
                console.log(error.response.data)
                return error.response.data;
            }

            // console.log(email)
            console.log(error)
            return Promise.reject('Can not fetch user');
        });
}

