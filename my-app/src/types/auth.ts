import { User } from './user';

//*=================LOGIN====================*//
export interface LoginResponse {
    error?: string;
    success: boolean;
    message: string;
    token: string;
    user: User;
}

//*=================SIGNUP====================*//
export interface EmailResponse {
    error?: string;
    success: boolean;
    message: string;
    details: string;
}

export interface OtpResponse {
    error?: string;
    success: boolean;
    message: string;
    email: string;
}

export interface ProfileResponse {
    error?: string;
    success: boolean;
    message: string;
    token: string;
    user: User;
    details: string;
}

export interface ISignupInfo {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    bankId: string;
    bankAccName: string;
    bankAccNo: string;
}
export type SignupContextType = {
    signupInfo: ISignupInfo;
    updateSignupInfo: (signupInfo: ISignupInfo) => void;
};
