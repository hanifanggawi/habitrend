import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { auth } from "$lib/server/lucia";

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData()) as Record<string, string>
        const { password, password2, email } = body

        if (password !== password2) {
            return fail(400, {
                error: 'Passwords didnt match'
            })
        }

        try {
            const user = await auth.createUser({
                primaryKey: {
                    providerId: 'email',
                    providerUserId: body.email,
                    password
                },
                attributes: {
                    email
                }
            });
            const session = await auth.createSession(user.userId);
            locals.auth.setSession(session);
        } catch (error) {
            console.error('[Error during login]', error)
            return fail(400, { error: 'Sign up failed, Username is already in use' });
        }

        throw redirect(303, '/')
    }
};