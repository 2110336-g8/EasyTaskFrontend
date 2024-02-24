import PersonalInfo from "@/components/account/profile/personalInfo";

export default function Profile() {
    return (
        <div className="w-full flex flex-col gap-[24px]">
            <h2>Your Profile</h2>
            <div className="desktop:w-[640px] w-full">
                <PersonalInfo></PersonalInfo>
            </div>
        </div>
    );
}