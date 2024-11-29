import { CircleIcon } from "lucide-react";
import Link from "next/link";

export default function Logo({
    title = false,
}: {
    title?: boolean;
}) {
    return (
        <Link href="/" className="flex items-center justify-center">
            <CircleIcon className="h-12 w-12 text-orange-500" />
            {
                title ? (
                    <h1 className="ml-2 text-xl font-semibold text-gray-900">
                        ACME
                    </h1>
                ) : null
            }
        </Link>
    )
}