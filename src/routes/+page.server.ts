import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const selectedHabit = await prisma.habit.findFirst()
  throw redirect(308, `/records/${selectedHabit?.id}`)
}