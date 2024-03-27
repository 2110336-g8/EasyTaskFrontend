import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/homepage/navbar/navigationbar';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className='w-full h-screen flex flex-col justify-center bg-slate-50'>
                <Navbar />
                <main className='w-full h-screen desktop:w-[1000px] pt-[112px] mx-auto pb-[20px] gap-[40px] px-[8px] desktop:px-[40px]'>
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
