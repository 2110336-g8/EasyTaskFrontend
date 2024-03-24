import ProtectedRoute from '@/components/ProtectedRoute';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
