import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { auth } from "$lib/server/lucia";

export const POST: RequestHandler = async ({ locals }) => {
  const session = await locals.auth.validate();
  try {
    if (session) {
      await auth.invalidateSession(session.sessionId);
      locals.auth.setSession(null);
    }
  } catch (err) {
    throw error(500, 'Error while tryoing to logout')
  }

  throw redirect(303, '/')
};