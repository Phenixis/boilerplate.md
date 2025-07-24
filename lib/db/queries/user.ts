import * from "./requirements"
import { getSession } from '@/lib/auth/session';
import { user } from "../schema"


export async function getUser(id?: string) {
  if (!id) {
    const session = await getSession();

    if (!session) {
      return null;
    }

    if (new Date(session.expires) < new Date()) {
      return null;
    }

    const user = await db
      .select()
      .from(users)
      .where(and(
        (session.user.id ? eq(users.id, session.user?.id) : eq(users.email, session.user?.email)),
        isNull(users.deletedAt))
      )
      .limit(1);

    if (user.length === 0) {
      return null;
    }

    return user[0];
  } else {
    const user = await db
      .select()
      .from(users)
      .where(and(
        eq(users.id, id),
        isNull(users.deletedAt))
      )
      .limit(1);

    if (user.length === 0) {
      return null;
    }

    return user[0];
  }
}