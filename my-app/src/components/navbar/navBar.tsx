import {
    EnvelopeClosedIcon,
    BackpackIcon,
    Pencil2Icon,
    PersonIcon,
} from '@radix-ui/react-icons';

export default function NavBar() {
    return (
        <div className='fixed top-0 left-0 right0 bg-blueple py-6 w-full'>
            <div className='max-w-7xl mx-auto px-4 flex items-center justify-between'>
                <h1 className='text-white text-lg font-semibold ml-4'>EasyTask</h1>
                <ul className='flex items-center justify-end'>
                    <li className='flex items-center'>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <EnvelopeClosedIcon className='h-5 w-5' />
                            <a href='#' className='text-sm'>Inbox</a>
                        </button>
                    </li>
                    <li className='flex items-center'>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <BackpackIcon className='h-5 w-5' />
                            <a href='#' className='text-sm'>Your Jobs</a>
                        </button>
                    </li>
                    <li className='flex items-center'>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <Pencil2Icon className='h-5 w-5' />
                            <a href='#' className='text-sm'>Your Ads</a>
                        </button>
                    </li>
                    <li className='flex items-center'>
                        <button className='flex flex-col justify-center items-center w-24 h-16 p-2 gap-1 text-white font-medium hover:text-gray-300 rounded-md'>
                            <PersonIcon className='h-5 w-5' />
                            <a href='#' className='text-sm'>Account</a>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
