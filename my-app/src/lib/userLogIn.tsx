import { LoginResponse } from "@/types";

const apiUrl = process.env.API_BASE_URL || "http://localhost:5001";
const loginUrl = `${apiUrl}/v1/auth/login`;

export async function userLogIn(email: string, password: string): Promise<LoginResponse> {
    try {
        const res = await fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const result = await res.json();
        if (result.success) {
            // setToken(result.token);
        }
        return result;

    } catch (error) {
        throw new Error('Can not fetch user');
    }
}

