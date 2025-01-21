
import { Breadcrumb as Bc, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function Breadcrumb({pathname} : {pathname:string}) {
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
                            <BreadcrumbItem key={index}>
                                <BreadcrumbSeparator />
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
                        )
                    })
                }
            </BreadcrumbList>
        </Bc>
    )
}