import type { Task } from '@/types/task'
import Dexie, { type Table } from 'dexie'

class DailyFocusDB extends Dexie {
    tasks!: Table<Task, number>

    constructor() {
        super('DailyFocusDB')

        this.version(1).stores({
            tasks: '++id, title, description, completed, createdAt, category',
        })
    }
}

export const db = new DailyFocusDB()