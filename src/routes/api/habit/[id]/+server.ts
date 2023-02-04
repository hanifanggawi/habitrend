import type { RequestHandler } from "./$types";
import { prisma } from "$lib/server/prisma";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ params }) => {
  const { id } = params
  const data = await prisma.habit.findUnique({
    where: {
      id: Number(id)
    }
  })

  return json({
    data,
    error: null
  });
}