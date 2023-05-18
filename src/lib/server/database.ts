import type { Prisma } from "@prisma/client"
import { getDateLimits } from "../util"
import { prisma } from "./prisma"

export async function fetchHabits(userId: string) {
  const records = await prisma.habit.findMany({
    where: {
      authUserId: userId
    }
  })
  return records
}

export async function fetchHabitById(id: number) {
  const habit = await prisma.habit.findUnique({
    where: {
      id: Number(id)
    }
  })
  return habit
}

export async function fetchHabitRecords(habitId: number, month: number, year?: number) {
  year ||= new Date().getFullYear()
  const { startDate, endDate } = getDateLimits(month, year)
  const records = await prisma.habitRecord.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate
      },
      habitId: {
        equals: habitId
      },
    },
    orderBy: {
      date: 'asc'
    }
  })
  return records
}

export async function createHabit(params: Prisma.HabitUncheckedCreateInput) {
  const habit = await prisma.habit.create({
    data: params
  })
  return habit
}

export async function updatehabit(id: number, params: Prisma.HabitUncheckedUpdateInput) {
  const updatedHabit = await prisma.habit.update({
    where: {
      id: id
    },
    data: params
  })
  return updatedHabit
}

export async function deleteHabit(id: number) {
  const deletedHabit = await prisma.habit.delete({
    where: {
      id: id
    },
  })
  return deletedHabit
}