import * from "./requirements"

export const ticketComment = pgTable('ticket_comment', {
  id: serial('id').primaryKey(),
  ticketId: integer('ticket_id')
    .notNull()
    .references(() => ticket.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  comment: text('comment').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const ticketCommentRelations = relations(ticketComment, ({ one }) => ({
  ticket: one(ticket, {
    fields: [ticketComment.ticketId],
    references: [ticket.id],
  }),
  user: one(users, {
    fields: [ticketComment.userId],
    references: [users.id],
  }),
}));

export type TicketComment = typeof ticketComment.$inferSelect;
export type NewTicketComment = typeof ticketComment.$inferInsert;