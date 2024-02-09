import NavBar from '@/components/navbar/navBar';
import '../globals.css';
import Footer from '@/components/homepage/footer';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='w-full min-h-full flex justify-center bg-inherit'>
            <NavBar />
            <main className='h-full w-full desktop:w-[1200px] desktop-l:w-[1400px] mx-auto mt-[120px] mb-[20px] bg-white flex flex-col gap-[40px]'>
                {children}
                <Footer />
            </main>
        </div>
    );
}