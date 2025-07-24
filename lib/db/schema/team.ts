import * as lib from "./library"
import { teamMemberTable, TeamMember } from "./team-member"
import { activityLogTable } from "./activity-log"
import { invitationTable } from "./invitation"
import { User } from "./user"

export const teamTable = lib.pgTable('team', {
  id: lib.serial('id').primaryKey(),
  name: lib.varchar('name', { length: 100 }).notNull(),
  createdAt: lib.timestamp('created_at').notNull().defaultNow(),
  updatedAt: lib.timestamp('updated_at').notNull().defaultNow(),
  stripeCustomerId: lib.text('stripe_customer_id').unique(),
  stripeSubscriptionId: lib.text('stripe_subscription_id').unique(),
  stripeProductId: lib.text('stripe_product_id'),
  planName: lib.varchar('plan_name', { length: 50 }),
  subscriptionStatus: lib.varchar('subscription_status', { length: 20 }),
});

export const teamRelations = lib.relations(teamTable, ({ many }) => ({
  teamMembers: many(teamMemberTable),
  activityLog: many(activityLogTable),
  invitation: many(invitationTable),
}));

export type Team = typeof teamTable.$inferSelect;
export type NewTeam = typeof teamTable.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email' | 'image'>;
  })[];
};