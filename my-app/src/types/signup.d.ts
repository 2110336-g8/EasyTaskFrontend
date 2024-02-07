export interface ISignupInfo {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    bankName: string;
    bankAccName: string;
    bankAccNo: string;
  }
export type SignupContextType = {
    signupInfo: ISignupInfo;
    updateSignupInfo: (signupInfo: ISignupInfo) => void;
};
