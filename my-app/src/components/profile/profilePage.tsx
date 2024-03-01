"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
    return (
        <div>
            <AspectRatio ratio={13 / 5} className="h-[240px] bg-primary-500">
                {/* Your banner photo */}
            </AspectRatio>

            <div className="absolute w-460 h-460">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-full h-full" />
                    <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}
