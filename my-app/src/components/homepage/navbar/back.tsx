import {
    EnvelopeClosedIcon,
    BackpackIcon,
    Pencil2Icon,
    PersonIcon,
} from '@radix-ui/react-icons';

export default function Back() {
    return (
        <div className='fixed left-0 top-0 right-0 bg-primary-500 w-full h-[72px] z-50 flex items-center justify-center'>
            <div className='h-full w-full desktop:w-[1200px] desktop-l:w-[1328px] flex items-center justify-between'>
                <button className='flex flex-col justify-center items-center w-24 h-16 pl-200 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                    <a
                        href='/'
                        className='text-white hover:text-gray-300 text-lg font-semibold'
                    >
                        EasyTask
                    </a>
                </button>
                <ul className='flex items-center justify-end space-x-4 h-[64px] ml-auto'> {/* Added ml-auto class here */}
                    <li>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <EnvelopeClosedIcon className='h-5 w-5' />
                            <a href='#' className='text-sm'>
                                Inbox
                            </a>
                        </button>
                    </li>
                    <li>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <BackpackIcon className='h-5 w-5' />
                            <a href='#' className='text-sm'>
                                Your Jobs
                            </a>
                        </button>
                    </li>
                    <li>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <Pencil2Icon className='h-5 w-5' />
                            <a href='#' className='text-sm'>
                                Your Ads
                            </a>
                        </button>
                    </li>
                    <li>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <PersonIcon className='h-5 w-5' />
                            <a href='/logout' className='text-sm'>
                                Account
                            </a>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
