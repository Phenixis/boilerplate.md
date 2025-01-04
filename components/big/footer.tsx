'use client';

import Logo from '@/components/big/logo';
import Link from 'next/link';
import { useValues } from '@/lib/auth';

export default function Footer() {
    const { appName } = useValues();

    const personnalLinks = [
        { title: 'Wisecart', href: 'http://wisecart.app/' },
        { title: 'Boilerplate', href: 'https://boilerplate.maximeduhamel.com/' },
        { title: 'Blog', href: 'https://maximeduhamel.com/' },
    ]

    return (
        <footer className="border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col justify-between items-center space-y-4">
                <section className="flex justify-between items-start w-full">
                    <article>
                        <h2 className="text-lg text-gray-500 font-black uppercase">Links</h2>
                        <p className="text-gray-700 hover:text-gray-900 hover:underline">
                            <Link href="/sign-in">
                                Login
                            </Link>
                        </p>
                        <p className="text-gray-700 hover:text-gray-900 hover:underline">
                            <Link href="/pricing">
                                Pricing
                            </Link>
                        </p>
                        <p className="text-gray-700 hover:text-gray-900 hover:underline">
                            <Link href="/sign-up">
                                Register
                            </Link>
                        </p>
                        <p className="text-gray-700 hover:text-gray-900 hover:underline">
                            <a href="mailto:contact@wisecart.app" target="_blank" rel="noopener noreferrer">
                                Support
                            </a>
                        </p>
                    </article>
                    <article>
                        <h2 className="text-lg text-gray-500 font-black uppercase">Legal</h2>
                        <p className="text-gray-700 hover:text-gray-900 hover:underline">
                            <Link href="/privacy-policy">
                                Privacy Policy
                            </Link>
                        </p>
                        <p className="text-gray-700 hover:text-gray-900 hover:underline">
                            <Link href="/tos">
                                Terms Of Services
                            </Link>
                        </p>
                    </article>
                    <article>
                        <h2 className="text-lg text-gray-500 font-black uppercase">By the maker of {appName}</h2>
                        {
                            personnalLinks.sort((a, b) => a.title.length > b.title.length ? 1 : -1).map((link) => (
                                link.href.startsWith('http') ? (
                                    <p className="text-gray-700 hover:text-gray-900 hover:underline">
                                        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                                            {link.title}
                                        </a>
                                    </p>
                                ) : (
                                    <p className="text-gray-700 hover:text-gray-900 hover:underline">
                                        <Link key={link.href} href={link.href}>
                                            {link.title}
                                        </Link>
                                    </p>
                                )
                            ))
                        }
                    </article>
                </section>
                <section className="flex justify-between items-center w-full">
                    <Logo />
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </section>
            </div>
        </footer>
    );
}