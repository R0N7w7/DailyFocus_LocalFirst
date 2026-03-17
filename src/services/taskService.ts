import { db } from "@/data/db"
import type { Task } from "@/types/task"

class TaskService {
    async getAllTasks(): Promise<Task[]> {
        return db.tasks.toArray()
    }

    async getTaskById(id: number): Promise<Task | undefined> {
        return db.tasks.get(id)
    }

    async addTask(task: Omit<Task, 'id'>): Promise<number> {
        return db.tasks.add(task)
    }

    async updateTask(id: number, updates: Partial<Omit<Task, 'id'>>): Promise<number> {
        return db.tasks.update(id, updates)
    }

    async deleteTask(id: number): Promise<void> {
        return db.tasks.delete(id)
    }
}

export const taskService = new TaskService()