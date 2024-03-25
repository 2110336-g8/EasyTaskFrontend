export default async function InboxLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='w-full h-fit desktop:w-[1000px] self-center px-[16px] desktop:px-[40px]'>
            {children}
        </div>
    );
}
