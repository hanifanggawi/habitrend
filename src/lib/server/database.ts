import type { Prisma } from "@prisma/client"
import { getDateLimits } from "../util"
import { prisma } from "./prisma"

export async function populateMonthlyData() {
  const habits = await prisma.habit.findMany()

  for (const habit of habits) {
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()

    const firstDayofMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const prevMonthDayCount = firstDayofMonth.getDay() - 1
    const nextMonthDayCount = 7 - lastDayOfMonth.getDay()

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
      const result = await prisma.habitRecord.upsert(args)
      console.log("insert succesfull", result.date)
    }
  }
}

export async function fetchHabits() {
  const records = await prisma.habit.findMany()
  return records
}

export async function fetchHabitRecords(month: number, habitId: number) {
  const { startDate, endDate } = getDateLimits(month)
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