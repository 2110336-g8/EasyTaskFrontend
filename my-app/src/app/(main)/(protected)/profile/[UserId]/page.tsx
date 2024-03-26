"use client";

import { useEffect, useState } from "react";
import { instance } from "@/utils/axiosInstance";
import ProfileError from "@/components/profile/profileError";
import Profile from "@/components/profile/profilePage";
import { UserProfile } from "@/types/user";


interface UserRoute {
    params: {
        UserId: string;
    };
}
    
export default function UserProfile({ params }: UserRoute) { 
    const userId = params.UserId; 
    const [userData, setUserData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!userId) {
                    return;
                }
                const userDataResponse = await instance.get(`/v1/users/${userId}`);

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
    }, [userId]);

    return (
        <div>
            { userData ? 
                <Profile {...userData} /> 
                :
                <ProfileError />
            }
        </div>
    );
}
