import Logo from '@/components/big/logo';

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Logo className="animate-spin" />
        </div>
    )
}