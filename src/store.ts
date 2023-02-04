import type { HabitRecord } from "@prisma/client"
import { writable } from "svelte/store"

export const showSidepanel = writable<boolean>(false)
export const selectedHabitRecord = writable<HabitRecord>(undefined)
export const habitRecordStore = writable<HabitRecord[]>(undefined)