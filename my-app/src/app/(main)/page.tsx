'use client';
import LayoutBox from '@/components/homepage/banner';
import { clientStorage } from '@/utils/storageService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const user = clientStorage.get().user;
        if (user) {
            router.push('/task');
        }
        setLoading(true);
    }, []);

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <LayoutBox />
        </main>
    );
}
