"use client"
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/signup/signupForm';
import VerificationForm from '@/components/signup/verificationForm';
import SignupInfoProvider from '@/context/signupInfoContext';
import { useEffect, useState } from 'react';

const AuthPage:React.FC = () => {
  const router = useRouter();

  // Initialize the type query parameter when the component mounts
  const [authType, setAuthType] = useState('email'); 

  console.log(authType)
  return (
    <SignupInfoProvider>
      <div>
        {authType === 'email' && <SignupForm setAuthType={setAuthType} />}
        {authType === 'verification' && <VerificationForm />}
      </div>
    </SignupInfoProvider>
  );
};

export default AuthPage;
