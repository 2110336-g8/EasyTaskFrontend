"use client";

import { useEffect, useState } from "react";
import { instance } from "@/utils/axiosInstance";
import ProfileError from "@/components/profile/profileError";
import { UserProfile } from '@/types/user';

interface UserRoute {
    params: {
        UserId: string;
    };
}
    
export default function UserProfile({ params }: UserRoute) { 
    const [userId, setUserId] = useState<string>(params.UserId); 
    const [userData, setUserData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!userId) {
                    return;
                }
                const userDataResponse = await instance.get(`/v1/users/${userId}`);

                if (userDataResponse.data.user) {
                    const userImageResponse = await instance.get(`/v1/users/${userId}/profile-image`);
                }

                setUserData(userDataResponse.data.user);

            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserData(null); // Reset user data if an error occurs
            }
        };

        fetchUser();
    }, [params.UserId]);

    return (
        <div>
            <p>Post: {userId}</p>
            <ProfileError />
        </div>
    );
}
