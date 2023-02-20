import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (locals.session) {
        throw redirect(303, '/')
    }
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const { data: _, error: err } = await locals.sb.auth.signInWithPassword({
            email: body.email as string,
            password: body.password as string
        })

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(401, {
                    error: 'Incorrect username or password',
                })
            }
        }

        throw redirect(303, '/')
    }
};