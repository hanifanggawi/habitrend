export function getDateLimits(monthNumber: number) {
  const year = new Date().getFullYear()
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