import { fetchHabits } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        habits: fetchHabits(),
    }
}) satisfies PageServerLoad;