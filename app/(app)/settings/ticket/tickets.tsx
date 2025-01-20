import { getFeedbacks } from "@/components/feedback/actions";
import { getUser } from "@/lib/db/queries";
import TicketsDisplay from "./ticketsDisplay";

export default async function Tickets() {
    const user = await getUser();
    if (!user) {
        return <div>User not found</div>;
    }

    const feedbacks = await getFeedbacks(user?.id || '', user?.email || '');

    return (
        <TicketsDisplay tickets={feedbacks} />
    )
}