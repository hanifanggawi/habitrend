import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  // TODO: check if user is logged in
  console.log('DISINI session', locals.session)
  if (!locals.session) {
    throw redirect(303, `/login`)
  }
  const selectedHabit = await prisma.habit.findFirst()
  throw redirect(303, `/records/${selectedHabit?.id}`)
}