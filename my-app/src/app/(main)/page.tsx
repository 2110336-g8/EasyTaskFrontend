'use client';
import LayoutBox from '@/components/homepage/banner';
import { clientStorage } from '@/utils/storageService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = clientStorage.get().token;
        if (token) {
            router.push('/task');
        } else {
            setLoading(false);
        }
    }, []);

    return (
        !isLoading && (
            <main className='flex min-h-screen flex-col items-center justify-between p-24'>
                <LayoutBox />
            </main>
        )
    );
}
