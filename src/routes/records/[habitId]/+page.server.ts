import { fetchHabitById, fetchHabitRecords, fetchHabits, populateMonthlyData } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const habitId = Number(params.habitId)
    if (isNaN(habitId)) {
        throw error(404, 'Not Found')
    }
    const thisMonth = new Date().getMonth()

    async function getMonthlyRecords() {
        const records = await fetchHabitRecords(thisMonth, habitId)
        if (records.length < 35) {
            await populateMonthlyData(thisMonth)
        }
        return await fetchHabitRecords(thisMonth, habitId)
    }
    return {
        habitRecords: getMonthlyRecords(),
        habits: fetchHabits(),
        habit: fetchHabitById(habitId)
    }
}) satisfies PageServerLoad;