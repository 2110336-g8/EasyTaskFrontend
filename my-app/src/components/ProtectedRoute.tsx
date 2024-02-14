'use client';
import { StorageKeys, clientStorage } from '@/utils/storageService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const router = useRouter();

    useEffect(() => {
        const token: string | null = clientStorage.get().token;
        console.log('token', token);
        if (!token) {
            router.push('/login');
        }
    }, []);
    return children;
};

export default ProtectedRoute;
