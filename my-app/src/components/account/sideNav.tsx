import { SmileIcon, Banknote, Landmark, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SideNav() {
    return (
        <div className='hidden tablet:block w-[360px] px-[16px] py-[8px] gap-y-[8px]'>
            <Link
                href='profile'
                className='flex flex-row w-full h-fit rounded-[8px] px-[16px] py-[16px] gap-x-[8px] hover:bg-slate-200'
            >
                <SmileIcon className='size-[24px]'></SmileIcon>
                <p>Your Profile</p>
            </Link>
            <Link
                href='bankAccount'
                className='flex flex-row w-full h-fit rounded-[8px] px-[16px] py-[16px] gap-x-[8px] hover:bg-slate-200'
            >
                <Landmark className='size-[24px]'></Landmark>
                <p>Bank Account</p>
            </Link>
            <Link
                href='adsPayment'
                className='flex flex-row w-full h-fit rounded-[8px] px-[16px] py-[16px] gap-x-[8px] hover:bg-slate-200'
            >
                <Banknote className='size-[24px]'></Banknote>
                <p>Ads Payment</p>
            </Link>
            <Link
                href='control'
                className='flex flex-row w-full h-fit rounded-[8px] px-[16px] py-[16px] gap-x-[8px] hover:bg-slate-200'
            >
                <Image src='/AccControl.png' alt='' width={24} height={24} />
                <p>Account Control</p>
            </Link>
        </div>
    );
}
