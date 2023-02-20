import { redirect } from '@sveltejs/kit';
import { createHabit } from '$lib/server/database';
import type { Actions } from './$types';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const habitData = {
            name: data.get('name') as string,
            description: data.get('description') as string,
        }
        await createHabit(habitData)
        throw redirect(301, '/habits')
    }
} satisfies Actions;