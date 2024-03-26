"use client";

import { useEffect, useState } from "react";
import { instance } from "@/utils/axiosInstance";
import ProfileError from "@/components/profile/profileError";
import Profile from "@/components/profile/profilePage";
import type { UserProfile } from "@/types/user"; 

export default function ViewProfile({ params: { UserId } }: { params: { UserId: string } }) {
    const [userData, setUserData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!UserId) {
                    return;
                }
                const userDataResponse = await instance.get(`/v1/users/${UserId}`);

                if (userDataResponse.data.user) {
                    setUserData(userDataResponse.data.user);
                } else {
                    setUserData(null);
                }

                console.log(userDataResponse.data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserData(null);
            }
        };

        fetchUser();
    }, [UserId]);

    return (
        <div>
            {userData ?
                <Profile {...userData} />
                :
                <ProfileError />
            }
        </div>
    );
}
