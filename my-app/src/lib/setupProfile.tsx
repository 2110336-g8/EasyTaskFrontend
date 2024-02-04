import axios from "@/utils/axiosInstance";
import { LoginResponse } from "@/types";

export async function userLogIn(email: string, password: string): Promise<LoginResponse> {
    return axios.post("/v1/auth/login", { email, password })
        .then((res) => {
            const result: LoginResponse = res.data;
            if (result.success) {
                // setToken(result.token);
            }
            return result;
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) { //Unauthorized
                return error.response.data;
            }
            return Promise.reject('Can not fetch user');
        });
}

