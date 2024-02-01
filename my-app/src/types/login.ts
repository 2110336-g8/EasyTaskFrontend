import { User } from "./index";

export interface LoginResponse {
    error?: string;
    success: boolean;
    message: string;
    token: string;
    user: User;
}
