import SideNav from '@/components/account/sideNav';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex flex-col w-full gap-y-[40px] px-[40px]'>
            <h1>Account Manager</h1>
            <div className='flex flex-row w-full h-full gap-x-[48px]'>
                <SideNav></SideNav>
                {children}
            </div>
        </div>
    );
}
