import { instance } from '@/utils/axiosInstance';
import { EmailResponse } from "@/types";

export async function emailVerification(
    email: string
    ): Promise<EmailResponse> {
    return instance.post("/v1/auth/sendOTP", { email })
        .then((res) => {
            const result: EmailResponse = res.data;
            if (result.success) {
                // setToken(result.token);
                console.log(result.message)
            }
            return result;
        })
        .catch((error) => {
            if (error.response && error.response.status === 403) { //Unauthorized
                console.log(error.response.data)
                return error.response.data;
            }

            else if (error.response && error.response.status === 400){
                console.log(error.response.data)
                return error.response.data;
            }

            console.log(email)
            console.log(error)
            return Promise.reject('Can not fetch user');
        });
}

