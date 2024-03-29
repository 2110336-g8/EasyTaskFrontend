"use client"

import { ISignupInfo, SignupContextType } from '@/types/auth';
import * as React from 'react';

export const SignupContext = React.createContext<SignupContextType | null>(null);

const SignupInfoProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [signupInfo, setSignupInfo] = React.useState<ISignupInfo>(
    {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phoneNumber:"",
        // Optional field
        bankId: "", // Might be change later what format to use (maybe some id)
        bankAccName: "",// Is this neccessry ?
        bankAccNo: "",//len == 10 & must be valid account number
    }
  );
  const updateSignupInfo = (signupInfo: ISignupInfo) => {
    setSignupInfo(signupInfo)
  }
  
  return (
    <SignupContext.Provider value={{ signupInfo, updateSignupInfo}}>
      {children}
    </SignupContext.Provider>
  );
};

export default SignupInfoProvider;