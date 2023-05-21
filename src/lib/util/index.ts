import type { HabitRecord } from "@prisma/client"

export function getDateLimits(monthNumber: number, year?: number) {
  year ||= new Date().getFullYear()
  const firstDayOfMonth = new Date(year, monthNumber, 1)
  const lastDayOfMonth = new Date(year, monthNumber + 1, 0)

  const prevMonthOverlapCount = firstDayOfMonth.getDay() - 1
  const nextMonthOverlapCount = 6 - lastDayOfMonth.getDay()

  const startDate = new Date(year, monthNumber, -prevMonthOverlapCount)
  const endDate = new Date(year, monthNumber, lastDayOfMonth.getDate() + nextMonthOverlapCount)
  return {
    startDate,
    endDate
  }
}

export function parseMonthQuery(monthQuery: string): number {
  const month: number = parseInt(monthQuery)
  if (!isNaN(month) && month >= 0 && month < 12) {
    return month
  }

  // current month
  return new Date().getMonth()
}

export function parseYearQuery(yearQuery: string): number {
  const year: number = parseInt(yearQuery)
  if (!isNaN(year)) {
    return year
  }

  // current year
  return new Date().getFullYear()
}

export function getDateQuery(url: URL) {
  const month = parseMonthQuery(url.searchParams.get('month') as string)
  const year = parseYearQuery(url.searchParams.get('year') as string)
  return {
    selectedMonth: month,
    selectedYear: year,
  }
}

function isSameDay(date1: Date, date2: Date) {
  return (date1?.getDate() === date2?.getDate())
    && (date1?.getMonth() === date2?.getMonth())
    && (date1?.getFullYear() === date2?.getFullYear())
}


export function padMonthlyData(dbRecords: HabitRecord[], habitId: number, monthNumber: number, year?: number): HabitRecord[] {
  const { startDate, endDate } = getDateLimits(monthNumber, year)
  let recordPointer = 0

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    if (isSameDay(date, dbRecords[recordPointer]?.date)) {
      recordPointer++
      continue
    }
    const paddingRecord: HabitRecord = {
      id: recordPointer * -1, // prevent this record to have the same ids with the one from the db
      date: new Date(date),
      status: 'unmarked',
      habitId: habitId
    }
    dbRecords.splice(recordPointer, 0, paddingRecord)
    recordPointer++
  }
  return dbRecords
}

export function checkToggle(env: string) {
  if (parseInt(env) || env == 'true') {
    return true
  }
  return false
}