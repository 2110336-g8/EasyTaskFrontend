import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfileError() {
    return (
        <div className="flex justify-center items-center h-screen gap-4">
            <Avatar className="size-[120px] rounded-full border-[4px] bg-white">
                <AvatarImage
                    src='/ProfilePicEmpty.png'
                    loading='lazy'
                    width={120}
                    height={120}
                    alt='User Profile'
                />
                <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <p className="italic text-base text-gray-500">Error: User Profile not found.</p>
        </div>
    );
}
