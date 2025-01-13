import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function AvatarsDisplay({ images, numberUsers } : { images?: string[], numberUsers?: number }) {
    const skeleton = (images === undefined && numberUsers === undefined);

    return (
        <div className="flex justify-center lg:justify-start items-center space-x-2">
            <div className={`flex -space-x-4 ${skeleton ? 'animate-pulse' : ''}`}>
                {
                    skeleton ?
                    Array(5).fill(null).map((_, i) => (
                        <div key={i} className="size-12 bg-gray-200 rounded-full border border-black"></div>
                    ))
                    :
                    images?.map((image, i) => (
                        <Avatar className="size-12" key={i}>
                            <AvatarImage src={image} />
                        </Avatar>
                    ))
                }
            </div>
            <p>
                Already <span className="font-bold">{skeleton ? 'X' : numberUsers}</span> users trust us
            </p>
        </div>
    )
}