export default async function InboxLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='w-full desktop:w-[1000px] self-center'>{children}</div>
    );
}
