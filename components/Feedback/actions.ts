"use server";

import { desc, and, eq, isNull, or, isNotNull, count } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {  } from '@/lib/db/schema';
import { ActionState } from '@/lib/auth/middleware';

export async  function sendFeedback(state: ActionState, data: FormData) {
    // TODO: define the schema for the feedback table
    // TODO: insert the feedback into the feedback table
    // TODO: define it as a ticket : these should be accessible from the settings with a ticketing system

    return {success: 'Feedback sent successfully'};
}