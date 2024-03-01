'use client';
import { clientStorage } from '@/utils/storageService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const token: string | null = clientStorage.get().token;
        console.log('token', token); 
        if (!token) {
            router.push('/login');
            return;
        }
        setLoading(false);
    }, []);
    return isLoading ? null : children;
};

export default ProtectedRoute;
