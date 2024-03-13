import SideNav from '@/components/account/sideNav';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex flex-col w-full tablet:gap-y-[40px] tablet:px-[40px] gap-y-[16px] px-[16px]'>
            <h1>Account Manager</h1>
            <div className='flex tablet:flex-row flex-col w-full h-full desktop:gap-x-[48px] tablet:gap-x-[16px]'>
                <SideNav></SideNav>
                {children}
            </div>
        </div>
    );
}
