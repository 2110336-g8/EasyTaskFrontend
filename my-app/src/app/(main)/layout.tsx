import NavBar from '@/components/homepage/navbar/navBar';
import '../globals.css';
import Footer from '@/components/homepage/footer';
import ProtectedRoute from '@/components/ProtectedRoute';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className='w-full min-h-full flex justify-center bg-inherit'>
                <NavBar />
                <main className='h-full w-full desktop:w-[1200px] desktop-l:w-[1328px] pt-[40px] mx-auto mt-[72px] mb-[20px] bg-white flex flex-col gap-[40px]'>
                    {children}
                    <Footer />
                </main>
            </div>
        </ProtectedRoute>
    );
}
