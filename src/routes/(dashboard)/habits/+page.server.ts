import { fetchHabits } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const { user } = await locals.auth.validateUser()
    if (!user) {
        throw redirect(302, '/login')
    }
    return {
        habits: fetchHabits(user?.userId),
    }
}) satisfies PageServerLoad;