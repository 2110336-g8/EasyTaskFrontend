"use client";

import { useEffect, useState } from "react";
import { instance } from "@/utils/axiosInstance";
import ProfileError from "@/components/profile/profileError";
import Profile from "@/components/profile/profilePage";
import type { UserProfile } from "@/types/user"; 
import ProfileLoading from "@/components/profile/profileLoading";

export default function ViewProfile({ params: { UserId } }: { params: { UserId: string } }) {
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [UserId]);

    return (
        <div>
            {loading ? (
                <ProfileLoading />
            ) : userData ? (
                <Profile {...userData as UserProfile} />
            ) : (
                <ProfileError />
            )}
        </div>
    );
}
