import Header from '@/components/big/header';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col min-h-screen">
            <SidebarProvider>
                <AppSidebar />
                <div className='w-full'>
                    <Header />
                    <SidebarTrigger />
                    {children}
                </div>
            </SidebarProvider>
        </section>
    );
}
