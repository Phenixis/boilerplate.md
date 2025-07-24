import * from "./requirements"

export const ticket = pgTable('ticket', {
  id: serial('id').primaryKey(),
  openedBy: text("userId")
    .references(() => users.id, { onDelete: "cascade" }),
  openerEmail: varchar('opener_email', { length: 255 }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('open'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  closedAt: timestamp('closed_at'),
});

export const ticketRelations = relations(ticket, ({ many }) => ({
  comments: many(ticketComment)
}));

export type Ticket = typeof ticket.$inferSelect;
export type NewTicket = typeof ticket.$inferInsert;

export enum TicketStatus {
  OPEN = 'open',
  REVIEWING = 'reviewing',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed',
}