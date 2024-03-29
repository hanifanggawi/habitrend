export type HabitStatus = 'done' | 'missed' | 'unmarked' | 'future'

export type HabitRecord = {
  id?: number
  date: Date
  status: HabitStatus
  habit: Habit
}

export type Habit = {
  id?: number,
  name: string
}