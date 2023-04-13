import type { Prisma } from "@prisma/client"
import { getDateLimits } from "../util"
import { prisma } from "./prisma"

export async function populateMonthlyData(monthNumber: number) {
  const habits = await prisma.habit.findMany()

  for (const habit of habits) {
    const month = monthNumber
    const year = new Date().getFullYear()

    const firstDayofMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const prevMonthDayCount = firstDayofMonth.getDay() - 1
    const nextMonthDayCount = 7 - lastDayOfMonth.getDay()

    let numRowsAffected = 0
    for (
      let date = new Date(year, month, -prevMonthDayCount);
      date <= new Date(year, month, lastDayOfMonth.getDate() + nextMonthDayCount);
      date.setDate(date.getDate() + 1)) {
      const args: Prisma.HabitRecordUpsertArgs = {
        where: {
          habitRecordIdentifier: {
            date: date,
            habitId: habit.id
          }
        },
        create: {
          date: date,
          status: 'unmarked',
          habitId: habit.id
        },
        update: {}
      }
      await prisma.habitRecord.upsert(args)
      numRowsAffected++
    }
    console.log(`Upserted ${numRowsAffected} row(s)`)
  }
}

export async function fetchHabits() {
  const records = await prisma.habit.findMany()
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
      }
    },
    orderBy: {
      date: 'asc'
    }
  })
  return records
}

export async function createHabit(params: Prisma.HabitCreateInput) {
  const habit = await prisma.habit.create({
    data: params
  })
  return habit
}

export async function updatehabit(id: number, params: Prisma.HabitUpdateInput) {
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