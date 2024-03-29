'use client';

import SignupForm from '@/components/signup/signupForm';
import VerificationForm from '@/components/signup/verificationForm';
import SignupInfoProvider from '@/context/signupInfoContext';
import { useState } from 'react';
import PasswordForm from '@/components/signup/passwordForm';
import BankAccountForm from '@/components/signup/bankAccountForm';
import ProfileSetupForm from '@/components/signup/profileSetupForm';

const AuthPage: React.FC = () => {
    // Initialize the type query parameter when the component mounts
    const [authType, setAuthType] = useState('email');

    console.log(authType);
    return (
        <SignupInfoProvider>
            <div>
                {authType === 'email' && (
                    <SignupForm setAuthType={setAuthType} />
                )}
                {authType === 'verification' && (
                    <VerificationForm setAuthType={setAuthType} />
                )}
                {authType === 'password' && (
                    <PasswordForm setAuthType={setAuthType} />
                )}
                {authType === 'profileSetup' && (
                    <ProfileSetupForm setAuthType={setAuthType} />
                )}
                {authType === 'bankAccount' && (
                    <BankAccountForm setAuthType={setAuthType} />
                )}
            </div>
        </SignupInfoProvider>
    );
};

export default AuthPage;
