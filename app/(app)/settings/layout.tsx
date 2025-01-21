'use client';

import { useState } from 'react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Users, Settings, Shield, Activity, Ticket, Slash, Menu, ChevronDown, SettingsIcon, Home, LayoutDashboard } from 'lucide-react';
import { useValues } from '@/lib/auth';
import Feedback from '@/components/feedback/feedback';
import DarkModeToggle from '@/components/big/darkModeToggler';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    ChevronsLeftRightIcon
} from '@/components/ui/chevrons-left-right';
import {
    ChevronsRightLeftIcon
} from '@/components/ui/chevrons-right-left';
import Logo from '@/components/big/logo';
import UserAvatar from '@/components/big/userAvatar';
import Breadcrumb from '@/components/big/breadcrumb';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
    const [isMenuTelOpen, setIsMenuTelOpen] = useState(false);
    const pathname = usePathname();
    const { open, setOpen, toggleSidebar } = useSidebar();

    const dashboardNavItems = [
        { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ]

    const settingsNavItems = [
        { href: '/settings', icon: Settings, label: 'General' },
        { href: '/settings/team', icon: Users, label: 'Team' },
        { href: '/settings/activity', icon: Activity, label: 'Activity' },
        { href: '/settings/security', icon: Shield, label: 'Security' },
        { href: '/settings/tickets', icon: Ticket, label: 'Tickets' },
    ];

    const navItems = {
        'Dashboard': dashboardNavItems,
        'Settings': settingsNavItems,
    }

    return (
        <>
            <Sidebar collapsible='icon'>
                <SidebarContent className="gap-0">
                    <SidebarHeader>
                        <Logo title={open} className="py-4" />
                    </SidebarHeader>
                    {
                        Object.entries(navItems).map(([key, item]) => {
                            return (
                                <Collapsible defaultOpen key={key} className="group/collapsible">
                                    <SidebarGroup>
                                        <SidebarGroupLabel asChild>
                                            <CollapsibleTrigger>
                                                {key}
                                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                            </CollapsibleTrigger>
                                        </SidebarGroupLabel>
                                        <CollapsibleContent>
                                            <nav className="h-full overflow-y-auto p-2">
                                                {item.map((subItem) => (
                                                    <Link key={subItem.href} href={subItem.href} passHref>
                                                        <Button
                                                            variant={pathname === subItem.href ? 'secondary' : 'ghost'}
                                                            className={`p-2 mt-1 w-full justify-start ${pathname === subItem.href ? 'bg-gray-100' : ''
                                                                }`}
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <subItem.icon className="size-4" />
                                                            {open && subItem.label}
                                                        </Button>
                                                    </Link>
                                                ))}
                                            </nav>
                                        </CollapsibleContent>
                                    </SidebarGroup>
                                </Collapsible>
                            )
                        })
                    }
                </SidebarContent>
                <SidebarFooter className={`${open && 'flex-row'} w-full justify-between items-center hidden md:flex`}>
                    <DarkModeToggle />
                    <Feedback />
                    <UserAvatar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} user={user} setUser={setUser} />
                    <Button
                        variant={'ghost'}
                        className={`p-2 justify-start`}
                        onClick={toggleSidebar}
                    >
                        {open ?
                            <ChevronsRightLeftIcon />
                            : <ChevronsLeftRightIcon />}
                    </Button>
                </SidebarFooter>
            </Sidebar>
            <main className="flex-1 overflow-y-auto p-0 md:p-4">
                <header className="flex justify-between items-center w-full px-4 py-1 md:hidden">
                    <Button
                        variant={'ghost'}
                        className={`p-2`}
                        onClick={toggleSidebar}
                    >
                        <Menu />
                    </Button>
                    <Logo title />
                    <div className="flex items-center">
                        <DarkModeToggle />
                        <Feedback />
                        <UserAvatar isMenuOpen={isMenuTelOpen} setIsMenuOpen={setIsMenuTelOpen} user={user} setUser={setUser} />
                    </div>
                </header>
                <Breadcrumb pathname={pathname} />
                {children}
            </main>
        </>
    );
}
