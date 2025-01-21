import { SidebarProvider } from '@/components/ui/sidebar';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-between">
            <SidebarProvider>
                {children}
            </SidebarProvider>
        </main>
    )
}