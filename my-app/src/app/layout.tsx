import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'EasyTask',
    description: 'Chase your dream!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className='h-full'>
            <body className={`${inter.className} relative m-0 p-0 h-full bg-white`}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
