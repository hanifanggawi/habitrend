import { redirect } from '@sveltejs/kit';
import { createHabit } from '$lib/server/database';
import type { Actions } from './$types';

export const actions = {
    default: async ({ request, locals }) => {
        const { user } = await locals.auth.validateUser()
        if (!user) {
            throw redirect(302, '/login')
        }
        const data = await request.formData();
        const habitData = {
            name: data.get('name') as string,
            description: data.get('description') as string,
            authUserId: user.userId
        }
        await createHabit(habitData)
        throw redirect(301, '/habits')
    }
} satisfies Actions;