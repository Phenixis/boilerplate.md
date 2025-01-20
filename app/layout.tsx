import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { ValuesProvider } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';
import Feedback from '@/components/Feedback/feedback';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
    title: {
        template: '%s | ' + (process.env.APP_NAME || 'NextJs Boilerplate'),
        default: process.env.APP_NAME || 'NextJs Boilerplate',
    },
    description: 'Get started quickly with Next.js, Postgres, and Stripe.',
};

export const viewport: Viewport = {
    maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let userPromise = getUser();
    let appName = process.env.APP_NAME || '[App]';
    let companyName = process.env.COMPANY_NAME || 'Company';

    return (
        <html
            lang="en"
            className={`bg-white text-black dark:text-white ${manrope.className}`}
        >
            <body>
                <ValuesProvider userPromise={userPromise} appName={appName} companyName={companyName}>
                    {children}
                    <Feedback />
                </ValuesProvider>
                <Toaster />
            </body>
        </html >
    );
}
