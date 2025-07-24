import * from "./requirements"

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  role: varchar('role', { length: 50 }).notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;