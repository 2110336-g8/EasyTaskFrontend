import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { UserCard } from '@/types/user';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { clientStorage } from "@/utils/storageService";
import Link from "next/link";

export default function ProfileCard(props: UserCard) {
    const id = clientStorage.get().user._id;
    return (
        <div className="flex flex-col justify-center items-start px-16 max-md:px-5">
            <div className="ml-36 max-w-full w-[647px]">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex justify-center items-center max-md:mt-10">
                            <Avatar className="size-[200px] rounded-full border-[4px] bg-white">
                                <AvatarImage
                                    src={props.imageUrl || '/ProfilePicEmpty.png'}
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
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 text-4xl tracking-tight text-slate-900 overflow-hidden whitespace-nowrap">
                                        {props.firstName + " " + props.lastName}
                                    </div>
                                    {(props._id === id) && (
                                        <Button asChild className="text-base px-3 py-2 border-2 border-primary-500 bg-white text-primary-500 font-semibold hover:bg-primary-100">
                                            <Link href="/account">Edit Profile</Link>
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <Skeleton className="h-8 w-[300px]" />
                            )
                        }

                            <div className="flex gap-2 mt-2 text-base tracking-normal text-white whitespace-nowrap">
                                {props.phoneNumber && (
                                    <button className="flex gap-2 px-4 py-2 bg-primary-500 rounded-3xl hover:bg-primary-300">
                                        <Phone /> 
                                        <a href={`tel:${props.phoneNumber}`}>{props.phoneNumber.replace(
                                            /(\d{3})(\d{3})(\d{4})/,
                                            '$1-$2-$3'
                                        )}</a>
                                    </button>
                                )}
                                {props.email && (
                                    <button className="flex gap-2 px-4 py-2 bg-primary-500 rounded-3xl hover:bg-primary-300">
                                        <Mail />
                                        <a href={`mailto:${props.email}`}>{props.email}</a>
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
