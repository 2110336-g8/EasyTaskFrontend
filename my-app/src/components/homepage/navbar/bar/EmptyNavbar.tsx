import Image from 'next/image';

export default function EmptyNavbar() {
    return (
        <div className="fixed left-0 top-0 right-0 z-50 justify-center items-center px-4 md:px-16 py-4 text-base font-medium tracking-normal leading-6 text-indigo-600 bg-slate-100 max-md:px-5">
            <div className="flex flex-wrap justify-between w-full max-md:flex-no-wrap">
                <div className="flex gap-5 items-center">
                    <a href="/">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={58}
                            height={32}
                            loading="lazy"
                            className="shrink-0 aspect-[1.82] w-[58px]"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}