"use client";

import { usePathname } from 'next/navigation';
import { Breadcrumb as Bc, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function Breadcrumb() {
    const pathname = usePathname();

    return (
        <Bc className="px-4 lg:px-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {
                    pathname.split('/').map((path, index) => {
                        if (path === '') return null;
                        return (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem key={index}>
                                    {
                                        index === pathname.split('/').length - 1 ? (
                                            <BreadcrumbPage>{path[0].toUpperCase() + path.slice(1)}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={
                                                pathname.split('/').slice(0, index + 1).join('/')
                                            }>{path[0].toUpperCase() + path.slice(1)}</BreadcrumbLink>
                                        )
                                    }
                                </BreadcrumbItem>
                            </>
                        )
                    })
                }
            </BreadcrumbList>
        </Bc>
    )
}