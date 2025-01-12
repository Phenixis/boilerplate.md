import Avatars from "./avatars"
import AvatarsSkeleton from "./avatarsSkeleton"
import { Suspense } from "react"

export default function SocialProof() {
    return (
        <Suspense fallback={<AvatarsSkeleton />}>
            <Avatars />
        </Suspense>
    )
}