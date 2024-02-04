import SignupForm from "@/components/signup/signupForm";
import PasswordForm from "@/components/signup/passwordForm";
import ProfileSetupForm from "@/components/signup/profileSetupForm";
import VerificationForm from "@/components/signup/verificationForm";
const SignupPage: React.FC = () => {
  return (
    <div>
      {/* <SignupForm /> */}
      {/* <PasswordForm /> */}
      {/* <ProfileSetupForm /> */}
      <VerificationForm />
    </div>
  );
};

export default SignupPage;