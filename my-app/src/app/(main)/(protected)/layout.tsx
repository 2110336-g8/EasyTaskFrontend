import ProtectedRoute from '@/components/ProtectedRoute';

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
