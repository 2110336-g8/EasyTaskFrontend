import React from 'react';
import { Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { UserCard } from '@/types/user';
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfileCard(props: UserCard) {
    return (
        <div className="flex flex-col justify-center items-start px-16 max-md:px-5">
            <div className="ml-36 max-w-full w-[647px]">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex justify-center items-center max-md:mt-10">
                            <Avatar className="size-[200px] rounded-full border-4 bg-white">
                                <AvatarImage
                                    src={props.imageUrl ? props.imageUrl : '/ProfilePicEmpty.png'}
                                    loading='lazy'
                                    width={200}
                                    height={200}
                                    alt='User Profile'
                                />
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col self-stretch my-auto font-semibold leading-[150%] max-md:mt-10">
                            {
                                (props.firstName || props.lastName) ? (
                                    <div className="text-4xl tracking-tight text-slate-900">
                                        {props.firstName + " " + props.lastName}
                                    </div>
                                ) : (
                                    <Skeleton className="h-8 w-[300px]" />
                                )
                            }

                            <div className="flex gap-2 mt-2 text-base tracking-normal text-white whitespace-nowrap">
                                {props.phoneNumber && (
                                    <button className="flex gap-2 px-4 py-2 bg-primary-500 rounded-3xl hover:bg-primary-300">
                                        <Phone />
                                        <div>{props.phoneNumber}</div>
                                    </button>
                                )}
                                {props.email && (
                                    <button className="flex gap-2 px-4 py-2 bg-primary-500 rounded-3xl hover:bg-primary-300">
                                        <Mail />
                                        <div>{props.email}</div>
                                    </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
