import { fetchHabitRecords, fetchHabits, populateMonthlyData } from "../lib/server/database";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    habitRecords: fetchHabitRecords(1,1),
    habits: fetchHabits()
  }
}

export const actions: Actions = {
  populate_monthly_data: async ({ request: _ }) => {
    await populateMonthlyData()

    return { success: true }
  }
} satisfies Actions;