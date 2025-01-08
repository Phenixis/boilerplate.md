import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db/drizzle"
import { users, accounts, authenticators, sessions } from "@/lib/db/schema"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    authenticatorsTable: authenticators,
    sessionsTable: sessions,
  }),
  providers: [Google],
  pages: {
    signIn: "sign-in",
  },
})