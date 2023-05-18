import type { RequestHandler } from "./$types";
import { prisma } from "$lib/server/prisma";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const reqbody = await request.json();
  const { habitId, status, date } = reqbody
  const data = await prisma.habitRecord.upsert({
    where: {
      habitRecordIdentifier: {
        habitId,
        date
      }
    },
    create: {
      date: date,
      status: status,
      habitId: habitId
    },
    update: {
      status
    }
  })
  return json({ data: data, error: null })
}