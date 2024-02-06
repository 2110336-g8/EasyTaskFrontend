import SignupForm from "@/components/signup/signupForm";
import PasswordForm from "@/components/signup/passwordForm";
import ProfileSetupForm from "@/components/signup/profileSetupForm";
import VerificationForm from "@/components/signup/verificationForm";

import SignupInfoProvider from "@/context/signupInfoContext";

const SignupPage: React.FC = () => {
  return (
    <SignupInfoProvider>
      <div>
        {/* <SignupForm /> */}
        {/* <PasswordForm /> */}
        {/* <ProfileSetupForm /> */}
        <VerificationForm />
      </div>
    </SignupInfoProvider>
  );
};

export default SignupPage;