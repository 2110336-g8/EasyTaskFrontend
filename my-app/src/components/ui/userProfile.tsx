import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileProps } from '@/types/task';

export default function UserProfile(props: ProfileProps) {
    return (
        <a href={`/profile/${props._id}`}>
            <div className='flex flex-row items-center gap-[16px]'>
                <AvatarProfile {...props} />
                <div className='flex flex-col gap-[4px]'>
                    <p>{props.name}</p>
                    {props.phoneNumber ? <p>{props.phoneNumber}</p> : null}
                </div>
            </div>
        </a>
    );
}

export function AvatarProfile(props: ProfileProps) {
    return (
        <a href={`/profile/${props._id}`}>
            <Avatar key={props._id} style={{ width: '56px', height: '56px' }}>
                <AvatarImage src={props.image} alt='@shadcn' />
                <AvatarFallback>?</AvatarFallback>
            </Avatar>
        </a>
    );
}
