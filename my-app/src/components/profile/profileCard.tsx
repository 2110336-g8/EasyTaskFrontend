import { Phone, Mail } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import { UserCard } from '@/types/user';


export default function ProfileCard() {
    const [userImg, setUserImg] = useState("");
    return (
        <div className="flex flex-col justify-center items-start px-16 max-md:px-5">
            <div className="ml-36 max-w-full w-[647px]">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                    <div className="flex justify-center items-center max-md:mt-10">
                    <Image
                        loading="lazy"
                        src={userImg === "" ? '/ProfilePicEmpty.png' : userImg}
                        alt="Profile Image"
                        width={200}
                        height={200}
                        className="rounded-full border-4 border-white border-solid"
                        style={{ backgroundColor: userImg === "" ? "white" : "transparent" }}
                    />
                    </div>
                </div>
                <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col self-stretch my-auto font-semibold leading-[150%] max-md:mt-10">
                    <div className="text-4xl tracking-tight text-slate-900">
                        Morty Smith
                    </div>
                    <div className="flex gap-2 mt-2 text-base tracking-normal text-white whitespace-nowrap">
                        <button className="flex gap-2 px-4 py-2 bg-indigo-600 rounded-[34px]">
                            <Phone />
                            <div>098-765-4321</div>
                        </button>
                        <button className="flex gap-2 px-4 py-2 bg-indigo-600 rounded-3xl">
                            <Mail />
                            <div>smith.m@gmail.com</div>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
