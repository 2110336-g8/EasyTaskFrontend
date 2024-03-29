"use client";

import Profile from "@/components/profile/profilePage";
import React, { useEffect, useState } from "react"; 
import { UserProfile } from '@/types/user';
import { clientStorage } from "@/utils/storageService";
import { instance } from "@/utils/axiosInstance";
import { toast } from "@/components/ui/use-toast";
import ProfileError from "@/components/profile/profileError";
import ProfileLoading from "@/components/profile/profileLoading";

export default function MyProfile() {
    const id: string | null = clientStorage.get().user._id;
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!id) {
                    return;
                }
                const userDataResponse = await instance.get(`/v1/users/${id}`);

                if (userDataResponse.data.user) {
                    setUserData(userDataResponse.data.user);
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Login Required',
                        description: 'You need to login first to view your profile.',
                    });
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
                toast({
                    variant: 'destructive',
                    title: 'Error Fetching User Data',
                    description: 'Failed to fetch user data. Please try again later.',
                });
                
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

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