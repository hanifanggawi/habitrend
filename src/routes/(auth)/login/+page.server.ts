import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const SUPPORTED_PROVIDERS = ['google']

export const load = (async ({ locals }) => {
    if (locals.session) {
        throw redirect(303, '/')
    }
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals, url }) => {
        const provider = url.searchParams.get("provider") as Provider
        console.log('DISINI provider', provider)
        if (provider) {
            if (!SUPPORTED_PROVIDERS.includes(provider)) {
                return fail(400, {
                    error: 'Provider not supported'
                })
            }

            const { data, error: err } = await locals.sb.auth.signInWithOAuth({
                provider: provider
            })

            if (err) {
                console.error(err)
                return fail(400, {
                    error: 'Something went wrong'
                })
            }
            console.log(data)
            throw redirect(303, data.url)
        }

        const body = Object.fromEntries(await request.formData())
        console.log('DISINI body', body)
        const { data, error: err } = await locals.sb.auth.signInWithPassword({
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

        // console.log('DISINI data', data)

        throw redirect(303, '/')
    },
};