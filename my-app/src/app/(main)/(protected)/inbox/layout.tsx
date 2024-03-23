export default async function InboxLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='w-full px-[96px] tablet:px-[172px] desktop:px-[364px]'>
            {children}
        </div>
    );
}
