import NavBar from '@/components/navbar/navBar';
import '../globals.css';
import Footer from '@/components/homepage/footer';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='relative min-h-full flex justify-center bg-inherit'>
            <main className='relative bg-inherit w-full min-h-full mt-[120px] mb-[20px] mx-[8px] tablet:mx-[96px] desktop::mx-[200px] pt-[56px]'>
                <NavBar />
                {children}
                <Footer />
            </main>
        </div>
    );
}
