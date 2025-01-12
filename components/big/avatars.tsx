import { getUserImages, getNumberUsers } from "@/lib/db/queries"
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default async function Avatars() {
    const images = await getUserImages(5);
    const numberUsers = await getNumberUsers();

    return (
        <div className="flex justify-start sm:justify-center lg:justify-start items-center space-x-2">
            <div className="flex -space-x-4">
                {
                    images.map((image, i) => (
                        <Avatar className="size-12" key={i}>
                            <AvatarImage src={image} />
                        </Avatar>
                    ))
                }
            </div>
            <p>
                Already {numberUsers[0].count} users trust us
            </p>
        </div>
    )
}