import { Ticket } from "@/lib/db/schema";

export default function TicketsDisplay(tickets?: Ticket[]) {
    return (
        <div>
            {tickets ?
                tickets.map((ticket) => (
                    <div key={ticket.id}>
                        <h2>{ticket.title}</h2>
                        <p>{ticket.description}</p>
                    </div>
                ))
                : <div>No tickets found</div>
            }
        </div>
    )

}