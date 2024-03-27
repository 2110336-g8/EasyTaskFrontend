import { AlertCircle } from 'lucide-react';

export default function Warning({
    children,
}: Readonly<{
    children?: string;
}>) {
    return (
        <div className='flex flex-row gap-x-[8px] py-[8px] px-[18px] bg-secondary-100 rounded-[6px]'>
            <AlertCircle className='stroke-secondary-500 min-w-fit' size={24} />
            <small className='text-secondary-500'>{children}</small>
        </div>
    );
}
