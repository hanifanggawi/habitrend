import { auth, googleAuth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
  const code = url.searchParams.get("code") as string;
  const state = url.searchParams.get("state");

  // get stored state from cookies
  const storedState = cookies.get("google_auth_state");

  // validate state
  if (state !== storedState) {
    throw new Response(null, { status: 401 });
  }

  try {
    const { existingUser, providerUser, createUser } = await googleAuth.validateCallback(code);

    const getUser = async () => {
      if (existingUser) {
        return existingUser;
      }
      return await createUser({
        email: providerUser.email
      });
    };
    const user = await getUser();
    console.log('[Logged in User]', user)
    const session = await auth.createSession(user.userId);
    locals.auth.setSession(session);
  } catch (e) {
    console.error(e)
    return new Response(`Failed to authenticate: ${e}`, {
      status: 500,
    });
  }
  throw redirect(302, "/");
};