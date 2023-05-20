import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = await locals.auth.validateUser();
  if (!user) {
    throw redirect(302, "/login")
  }
  const selectedHabit = await prisma.habit.findFirst({
    where: {
      authUserId: user?.userId
    }
  })
  if (!selectedHabit) {
    throw redirect(302, '/habits/add')
  }
  throw redirect(303, `/records/${selectedHabit?.id}`)
}