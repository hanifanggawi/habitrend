import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { auth } from '../../../lib/server/lucia';
import { LuciaError } from 'lucia-auth';

export const load = (async ({ locals }) => {
    const session = await locals.auth.validate();
    if (session) {
        throw redirect(302, "/");
    }
})

export const actions: Actions = {
    default: async ({ request, locals, url }) => {
        const provider = url.searchParams.get("provider")
        if (provider) {
            // TODO: handle OAuth logins
        }
        const formData = await request.formData()
        const body = Object.fromEntries(formData) as Record<string, string>
        console.log('DISINI body', body)

        try {
            const key = await auth.useKey('email', body.email, body.password);
            const session = await auth.createSession(key.userId);
            locals.auth.setSession(session);
            console.log('DISINI session', session)
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