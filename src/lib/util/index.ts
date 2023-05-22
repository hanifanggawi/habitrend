import type { HabitRecord } from "@prisma/client"
import { DateTime } from "luxon"

export function getDateLimits(monthNumber: number, year?: number) {
  const month = monthNumber + 1 // Luxon dates are 1 indexed
  year ||= DateTime.utc().year

  const prevMonthOffset = DateTime.utc(year, month).weekday % 7
  let nextMonthOffset = 6 - DateTime.utc(year, month).endOf('month').weekday
  nextMonthOffset = (nextMonthOffset >= 0) ? nextMonthOffset : 6

  const startDate = DateTime.utc(year, month).minus({ days: prevMonthOffset }).toJSDate()
  const endDate = DateTime.utc(year, month).endOf('month').startOf('day').plus({ days: nextMonthOffset }).toJSDate()

  console.log('start:', startDate.toISOString(), 'end:', endDate.toISOString())
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

export function isSameDay(date1: Date, date2: Date) {
  return (date1?.getDate() === date2?.getDate())
    && (date1?.getMonth() === date2?.getMonth())
    && (date1?.getFullYear() === date2?.getFullYear())
}


export function padMonthlyData(dbRecords: HabitRecord[], habitId: number, monthNumber: number, year?: number): HabitRecord[] {
  const { startDate, endDate } = getDateLimits(monthNumber, year)
  let recordPointer = 0
  console.log('DISINI initial dbRecords', dbRecords)

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    if (dbRecords[recordPointer]?.date) {
      console.log('DISINI compare', recordPointer, date, dbRecords[recordPointer]?.date, 'hasil', isSameDay(date, dbRecords[recordPointer]?.date))
    }
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
  console.log('DISINI records', dbRecords.map(record => `${(record.id < 0 ? 'P' : '[]')}${record.date.getDate()}/${record.date.getMonth()}/${record.date.getFullYear()}`))
  return dbRecords
}

export function checkToggle(env: string) {
  if (parseInt(env) || env == 'true') {
    return true
  }
  return false
}