"use client";

import Profile from "@/components/profile/profilePage";
import React, { useEffect, useState } from "react"; 
import { UserProfile } from '@/types/user';
import { clientStorage } from "@/utils/storageService";
import { instance } from "@/utils/axiosInstance";
import { toast } from "@/components/ui/use-toast";

const ProfileComponent: React.FC = () => { 
    const [userData, setUserData] = useState<UserProfile | null>(null); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const id = clientStorage.get().user._id;
                if (!id) {
                    return;
                }
                const userDataResponse = await instance.get(`/v1/users/${id}`);

                if (userDataResponse.data.user) {
                    console.log(userDataResponse.data.user);
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
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <Profile {...userData} />
        </div>
    );
}

export default ProfileComponent;