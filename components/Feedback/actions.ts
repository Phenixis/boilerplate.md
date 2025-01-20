"use server";

import { desc, and, eq, isNull, or, isNotNull, count } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { ticket, NewTicket, TicketStatus } from '@/lib/db/schema';
import { ActionState } from '@/lib/auth/middleware';

export async function sendFeedback(state: ActionState, data: FormData) {

    const newTicket: NewTicket = {
        title: data.get('title') as string,
        description: data.get('description') as string,
        openedBy: data.get('userId') as string,
        openerEmail: data.get('email') as string,
        status: TicketStatus.OPEN,
    };

    const result = await db.insert(ticket).values(newTicket);

    return { success: 'Feedback sent successfully' };
}