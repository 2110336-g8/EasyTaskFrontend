import {
    EnvelopeClosedIcon,
    BackpackIcon,
    Pencil2Icon,
    PersonIcon,
} from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

export default function NavBar() {
    return (
        <div className='fixed left-0 top-0 right0 bg-primary-500 py-6 w-full z-50 '>
            <div className='max-w-7xl mx-16 my-auto px-4 flex items-center justify-between'>
                <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                    <a
                        href='/'
                        className='text-white hover:text-gray-300 text-lg font-semibold ml-4'
                    >
                        EasyTask
                    </a>
                </button>
                <ul className='flex items-center justify-end'>
                    <li className='flex items-center'>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <EnvelopeClosedIcon className='h-5 w-5' />
                            <a href='#' className='text-sm'>
                                Inbox
                            </a>
                        </button>
                    </li>
                    <li className='flex items-center'>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <BackpackIcon className='h-5 w-5' />
                            <a href='#' className='text-sm'>
                                Your Jobs
                            </a>
                        </button>
                    </li>
                    <li className='flex items-center'>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <Pencil2Icon className='h-5 w-5' />
                            <a href='#' className='text-sm'>
                                Your Ads
                            </a>
                        </button>
                    </li>
                    <li className='flex items-center'>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <PersonIcon className='h-5 w-5' />
                            <a href='#' className='text-sm'>
                                Account
                            </a>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
