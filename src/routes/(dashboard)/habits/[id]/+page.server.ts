import { deleteHabit, fetchHabitById, updatehabit } from '$lib/server/database';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const { id } = params
    return {
        habit: fetchHabitById(Number(id))
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    update: async ({ request }) => {
        const data = await request.formData();
        const habitId = Number(data.get('id'))
        const habitData = {
            name: data.get('name') as string,
            description: data.get('description') as string,
        }
        await updatehabit(habitId, habitData)
        throw redirect(301, '/habits')
    },
    delete: async ({ params }) => {
        const { id } = params
        const habitId = Number(id)
        if (isNaN(habitId)) {
            throw error(404, 'Page not found')
        }
        await deleteHabit(habitId)
        throw redirect(301, '/habits')
    }
} satisfies Actions;