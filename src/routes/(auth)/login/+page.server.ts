import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { auth, googleAuth } from '$lib/server/lucia';
import { LuciaError } from 'lucia-auth';

const SUPPORTED_PROVIERS = ['google']

export const actions: Actions = {
    default: async ({ request, locals, url, cookies }) => {
        const provider = url.searchParams.get("provider")
        if (provider && SUPPORTED_PROVIERS.includes(provider)) {
            const [url, state] = await googleAuth.getAuthorizationUrl()
            cookies.set("google_auth_state", state, {
                path: "/",
                maxAge: 60 * 60
            });

            throw redirect(302, url.toString())
        }
        const formData = await request.formData()
        const body = Object.fromEntries(formData) as Record<string, string>

        try {
            const key = await auth.useKey('email', body.email, body.password);
            const session = await auth.createSession(key.userId);
            locals.auth.setSession(session);
        } catch (error) {
            if (error instanceof LuciaError) {
                console.error('[Login Error]', error.message, '\nDetail:', error.stack)
            }
            return fail(400, {
                error: 'Invalid username or password'
            });
        }

        throw redirect(303, '/')
    },
};