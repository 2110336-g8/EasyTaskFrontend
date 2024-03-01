import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from "next/link"

export default function LogoutNavbar() {
    return (
        <div className='fixed left-0 top-0 right-0 bg-slate-100 w-full h-[72px] z-50 flex items-center justify-center gap-8'>
            <div className='p-400 w-full desktop:w-[1200px] desktop-l:w-[1328px] flex items-center justify-between'>
                <a href="/" className="relative">
                    <Image src="/logo.svg" alt="Logo" width={58} height={32} className="brightness-normal transition duration-300" />
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-25 transition duration-250"></div>
                </a>

                <ul className='flex items-center justify-end space-x-4 h-[64px] ml-auto'>
                    <Button variant="outline" className='border-primary-500 text-primary-500 hover:text-primary-500' asChild>
                        <Link href="/login">Log in</Link>
                    </Button>
                    <Button variant="outline" className='border-primary-500 bg-primary-500 hover:bg-primary-500 text-white hover:text-slate-300' asChild>
                        <Link href="/signup">Sign up</Link>
                    </Button>
                </ul>
            </div>
        </div>
    );
}
