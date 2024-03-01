import {
    EnvelopeClosedIcon,
    BackpackIcon,
    Pencil2Icon,
    PersonIcon,
} from '@radix-ui/react-icons';
import { clientStorage } from '@/utils/storageService'; 
import Image from 'next/image';

export default function loginNavbar({ handleLogout }) {

    return (
        <div className='fixed left-0 top-0 right-0 bg-slate-100 w-full h-[72px] z-50 flex items-center justify-center gap-8'>
            <div className='p-200 w-full desktop:w-[1200px] desktop-l:w-[1328px] flex items-center justify-between'>
                <a href="/" className="relative">
                    <Image src="/logo.svg" alt="Logo" width={58} height={32} className="brightness-normal transition duration-300" />
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-25 transition duration-250"></div>
                </a>

                <ul className='flex items-center justify-end space-x-4 h-[64px] ml-auto'>
                    <li className="inline-flex items-center gap-1 p-8 h-full">
                        <EnvelopeClosedIcon />
                        <span>Inbox</span>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}