import { fetchHabitById, fetchHabitRecords, fetchHabits } from '$lib/server/database';
import { error, redirect } from '@sveltejs/kit';
import { getDateQuery, padMonthlyData } from '$lib/util';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, url, locals }) => {
    const { user } = await locals.auth.validateUser()
    if (!user) {
        throw redirect(302, '/login')
    }
    const habitId = Number(params.habitId)
    const habit = await fetchHabitById(habitId)
    if (isNaN(habitId) || habit?.authUserId !== user.userId) {
        throw error(404, 'Not Found')
    }
    const { selectedMonth, selectedYear } = getDateQuery(url)
    async function getMonthlyRecords(habitId: number, month: number, year: number) {
        const records = await fetchHabitRecords(habitId, month, year)
        if (records.length < 35) {
            return padMonthlyData(records, habitId, month, year)
        }
        return records
    }
    return {
        habitRecords: getMonthlyRecords(habitId, selectedMonth, selectedYear),
        habits: fetchHabits(user.userId),
        habit: habit
    }
}) satisfies PageServerLoad;