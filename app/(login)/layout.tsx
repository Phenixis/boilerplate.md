import { UserProvider } from "@/lib/auth";
import { Manrope } from 'next/font/google';
import { getUser } from '@/lib/db/queries';

const manrope = Manrope({ subsets: ['latin'] });

export default function Layout(
    { children }: {
        children: React.ReactNode;
    }
) {
    let userPromise = getUser();

    return (
        <html
            lang="en"
            className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
        >
            <UserProvider userPromise={userPromise}>
                <body className="min-h-screen bg-gray-50 flex flex-col justify-between">
                    {children}
                </body>
            </UserProvider>
        </html >
    );
}
