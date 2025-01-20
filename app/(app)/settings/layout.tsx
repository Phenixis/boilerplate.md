'use client';

import { useState } from 'react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Users, Settings, Shield, Activity, Menu, Ticket, Home, LogOut } from 'lucide-react';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import { useValues } from '@/lib/auth';
import Feedback from '@/components/feedback/feedback';
import DarkModeToggle from '@/components/big/darkModeToggler';
import {
    SidebarProvider,
    SidebarTrigger,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, setUser } = useValues();
    if (!user) {
        redirect('/login');
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    async function handleSignOut() {
        setUser(null);
        await signOut();
        router.push('/');
    }

    const navItems = [
        { href: '/settings', icon: Settings, label: 'General' },
        { href: '/settings/team', icon: Users, label: 'Team' },
        { href: '/settings/activity', icon: Activity, label: 'Activity' },
        { href: '/settings/security', icon: Shield, label: 'Security' },
        { href: '/settings/ticket', icon: Ticket, label: 'Ticket' },
    ];

    return (
        <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <Sidebar collapsible='icon'>
                <SidebarContent>
                    <nav className="h-full overflow-y-auto p-2">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} passHref>
                                <Button
                                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                                    className={`p-2 mt-1 w-full justify-start ${pathname === item.href ? 'bg-gray-100' : ''
                                        }`}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <item.icon className="size-4" />
                                    {isSidebarOpen ? item.label : ''}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </SidebarContent>
                <SidebarFooter className={`${isSidebarOpen && 'flex-row'} w-full justify-between items-center`}>
                    <DarkModeToggle />
                    <Feedback />
                    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <DropdownMenuTrigger asChild>
                            <div className={`flex space-x-2 items-center py-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800`}>
                                {
                                    isSidebarOpen && (<p className="text-sm font-medium">
                                        {user.name ? user.name : user.email}
                                    </p>)
                                }
                                <Avatar className="cursor-pointer size-8">
                                    <AvatarImage src={user.image || ''} alt={user.name || ''} />
                                    <AvatarFallback>
                                        {
                                            (user.name ? user.name : user.email)
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')
                                        }
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="flex flex-col gap-1">
                            <DropdownMenuItem className="cursor-pointer">
                                <Link href="/dashboard" className="flex w-full items-center">
                                    <Home className="mr-2 h-4 w-4" />
                                    <span>Dashboard</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Link href="/settings" className="flex w-full items-center">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <form action={handleSignOut} className="w-full">
                                <button type="submit" className="flex w-full">
                                    <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </button>
                            </form>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarFooter>
            </Sidebar>
            <main className="flex-1 overflow-y-auto p-0 lg:p-4">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
