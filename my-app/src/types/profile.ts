import { User } from "./index";

export interface ProfileResponse {
    error?: string;
    success: boolean;
    message: string;
    token: string;
    user: User;
    details : string;
}
