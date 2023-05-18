import { deleteHabit, fetchHabitById, updatehabit } from '$lib/server/database';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
    const { user } = await locals.auth.validateUser()

    const habitId = Number(params.id)
    const habit = await fetchHabitById(habitId)
    if (isNaN(habitId) || habit?.authUserId !== user?.userId) {
        throw error(404, 'Not Found')
    }
    return {
        habit: habit
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    update: async ({ request, locals }) => {
        const { user } = await locals.auth.validateUser()
        const data = await request.formData();
        const habitId = Number(data.get('id'))
        const habit = await fetchHabitById(habitId)
        if (habit?.authUserId !== user?.userId) {
            throw error(404, 'Page not found')
        }
        const habitData = {
            name: data.get('name') as string,
            description: data.get('description') as string,
            authUserId: user?.userId
        }
        await updatehabit(habitId, habitData)
        throw redirect(301, '/habits')
    },
    delete: async ({ params, locals }) => {
        const { session } = await locals.auth.validateUser()
        const { id } = params
        const habitId = Number(id)
        const habit = await fetchHabitById(habitId)
        if (isNaN(habitId) || habit?.authUserId !== session?.userId) {
            throw error(404, 'Page not found')
        }
        await deleteHabit(habitId)
        throw redirect(301, '/habits')
    }
} satisfies Actions;