import { LoginResponse } from "@/types";

export async function userLogIn(email: string, password: string): Promise<LoginResponse> {
    try {
        const res = await fetch(process.env.API_BASE_URL || "http://localhost:5001/v1/auth/login", {
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

