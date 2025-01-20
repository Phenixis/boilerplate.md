export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-between">
            {children}
        </main>
    )
}