import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

interface ClientProfileProps {
    _id: string;
    image: string;
    name: string;
    phoneNumber?: string;
}

export default function ClientProfile(props: ClientProfileProps) {
    return (
        <a href={`/profile/${props._id}`}>
            <div className='flex flex-row items-center gap-[16px]'>
                <Avatar key={props._id} style={{ width: '56px', height: '56px' }}>
                    <AvatarImage src={props.image} alt='@shadcn' />
                    <AvatarFallback>?</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-[4px]'>
                    <p>{props.name}</p>
                    {props.phoneNumber ? (
                        <p>{props.phoneNumber}</p>
                    ) : null}
                </div>
            </div>
        </a>
    );
}