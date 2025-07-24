import * from "./requirements"

export const user = pgTable('user', {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  passwordHash: text('password_hash'),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  image: text("image"),
});

export const userRelations = relations(user, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
  activityLogs: many(activityLogs),
  authenticators: many(authenticators),
  accounts: many(accounts),
  sessions: many(sessions),
  ticket: many(ticket),
}));

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;