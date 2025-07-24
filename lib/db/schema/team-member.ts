import * as lib from "./library"
import { teamTable } from "./team"
import { userTable } from "./user"

export const teamMemberTable = lib.pgTable('team_member', {
  id: lib.serial('id').primaryKey(),
  userId: lib.text("userId")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  teamId: lib.integer('team_id')
    .notNull()
    .references(() => teamTable.id),
  role: lib.varchar('role', { length: 50 }).notNull(),
  joinedAt: lib.timestamp('joined_at').notNull().defaultNow(),
});

export const teamMemberRelations = lib.relations(teamMemberTable, ({ one }) => ({
  user: one(userTable, {
    fields: [teamMemberTable.userId],
    references: [userTable.id],
  }),
  team: one(teamTable, {
    fields: [teamMemberTable.teamId],
    references: [teamTable.id],
  }),
}));

export type TeamMember = typeof teamMemberTable.$inferSelect;
export type NewTeamMember = typeof teamMemberTable.$inferInsert;