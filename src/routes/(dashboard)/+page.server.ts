import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { TOGGLE_DISABLE_AUTH } from '$env/static/private'
import { checkToggle } from "$lib/util";

export const load: PageServerLoad = async ({ locals }) => {
  // TODO: check if user is logged in
  const { user } = await locals.auth.validateUser();
  console.log('DISINI user', user)
  if (!user && !checkToggle(TOGGLE_DISABLE_AUTH)) {
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