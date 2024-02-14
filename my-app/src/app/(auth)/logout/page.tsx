"use client"

import NavBar from '@/components/homepage/navbar/navBar';
import Footer from '@/components/homepage/footer';
import LogoutForm from "@/components/logout/logoutForm";

const LogoutPage: React.FC = () => {
    return (
        <div className='w-full min-h-full flex justify-center bg-inherit'>
            <NavBar />
            <main className='h-full w-full desktop:w-[1200px] desktop-l:w-[1328px] pt-[40px] mx-auto mt-[120px] mb-[20px] bg-white flex flex-col gap-[40px]'>
                <LogoutForm />
                <Footer />
            </main>
        </div>
    );
}

export default LogoutPage;
