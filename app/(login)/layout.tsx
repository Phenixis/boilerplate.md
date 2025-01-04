import { ValuesProvider } from '@/lib/auth';
import { Manrope } from 'next/font/google';
import { getUser } from '@/lib/db/queries';

const manrope = Manrope({ subsets: ['latin'] });

export default function Layout(
    { children }: {
        children: React.ReactNode;
    }
) {
    let userPromise = getUser();
    let appName = process.env.APP_NAME || '[App]';
    let companyName = process.env.COMPANY_NAME || 'Company';

    return (
        <html
            lang="en"
            className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
        >
            <ValuesProvider userPromise={userPromise} appName={appName} companyName={companyName}>
                <body className="min-h-screen bg-gray-50 flex flex-col justify-between">
                    {children}
                </body>
            </ValuesProvider>
        </html >
    );
}
