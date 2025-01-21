import Breadcrumb from '@/components/big/breadcrumb';
import { Sidebar, MobileSidebar } from '@/components/big/sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-0 md:p-4">
                <MobileSidebar />
                <Breadcrumb />
                {children}
            </main>
        </>
    );
}
