import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { TOGGLE_DISABLE_AUTH } from '$env/static/private'
import { checkToggle } from "$lib/util";

export const load: PageServerLoad = async ({ locals }) => {
  // TODO: check if user is logged in
  if (!locals.session && !checkToggle(TOGGLE_DISABLE_AUTH)) {
    throw redirect(303, `/login`)
  }
  const selectedHabit = await prisma.habit.findFirst()
  throw redirect(303, `/records/${selectedHabit?.id}`)
}