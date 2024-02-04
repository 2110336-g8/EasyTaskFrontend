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
        <html lang='en'>
            <body className={inter.className}>
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    );
}
