
import Logo from '@/components/big/logo';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Logo />
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                <p>
                    <Link href="/tos">
                        Terms Of Services
                    </Link>
                </p>
            </div>
        </footer>
    );
}