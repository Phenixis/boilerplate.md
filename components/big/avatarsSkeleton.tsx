export default function AvatarsSkeleton() {
    return (
        <div className="flex justify-center lg:justify-start items-center space-x-2">
            <div className="flex -space-x-4 animate-pulse">
                {
                    Array(5).fill(null).map((_, i) => (
                        <div key={i} className="size-12 bg-gray-200 rounded-full border border-black"></div>
                    ))
                }
            </div>
            <p>
                Already X users trust us
            </p>
        </div>
    )
}