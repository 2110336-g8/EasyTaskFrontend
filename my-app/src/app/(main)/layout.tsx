import '../globals.css';
import Footer from '@/components/homepage/footer';
import Navbar from '@/components/homepage/navbar/navigationbar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='w-full min-h-full flex justify-center bg-slate-50'>
            <Navbar />
            <main className='w-full desktop:w-[1200px] desktop-l:w-[1328px] pt-[112px] mx-auto pb-[20px] flex flex-col gap-[40px]'>
                {children}
                <Footer />
            </main>
        </div>
    );
}
