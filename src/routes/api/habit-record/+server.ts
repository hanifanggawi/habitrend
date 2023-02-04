import type { RequestHandler } from "./$types";
import { prisma } from "$lib/server/prisma";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const reqbody = await request.json();
  const { habitId, status, date } = reqbody
    const data = await prisma.habitRecord.update({
      where: {
        habitRecordIdentifier: {
          habitId,
          date
        },
      },
      data: {
        habitId: habitId,
        date: date,
        status: status
      }
    })
    return json({ data, error: null })
}