import { getFeedbacks } from "@/components/feedback/actions";
import { getUser } from "@/lib/db/queries";
import TicketsDisplay from "./ticketsDisplay";

export default async function tickets() {
    const user = await getUser();
    if (!user) {
        return { error: 'User not found' };
    }

    const feedbacks = await getFeedbacks(user?.id || '', user?.email || '');
    
    if (!Array.isArray(feedbacks)) {
        return (
            <div>{feedbacks.error}</div>
        )
    }
    
    return (
        <TicketsDisplay tickets={feedbacks} />
    )
}