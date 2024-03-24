import Image from 'next/image';

export default function LogoutNavbar() {
    return (
        <div className="fixed left-0 top-0 right-0 z-50 flex flex-col justify-end pb-20 text-base tracking-normal ">
            <div className="flex justify-center items-center px-16 py-3.5 w-full bg-slate-100 max-md:px-5 max-md:max-w-full">
                <div className="flex gap-5 justify-between w-full max-w-[1328px] max-md:flex-wrap max-md:max-w-full">
                    <a href="/">
                        <Image src="/logo.svg" alt="Logo" width={58} height={32} loading="lazy" className="shrink-0 my-auto aspect-[1.82] w-[58px]" />
                    </a>
                    <div className="flex gap-5 justify-between items-center">
                        <a href="/login" className="flex justify-center items-center px-5 py-2 font-semibold leading-7 text-primary-500 rounded-md border border-primary-500 border-solid hover:bg-indigo-100 h-full">
                            Log in
                        </a>
                        <a href="/signup" className="flex justify-center items-center px-5 py-2 my-auto font-medium text-white bg-primary-500 rounded-md border border-solid leading-[150%] hover:bg-indigo-500 h-full">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
