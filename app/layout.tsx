import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { ValuesProvider } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';
import Header from '@/components/big/header';
import Footer from '@/components/big/footer';

export const metadata: Metadata = {
    title: 'Next.js SaaS Starter',
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
                    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-between">
                        <Header />
                        {children}
                        <Footer />
                    </main>
                </ValuesProvider>
            </body>
        </html >
    );
}
