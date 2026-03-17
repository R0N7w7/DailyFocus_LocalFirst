export interface Task {
  id?: number // opcional porque Dexie lo autogenera con ++id
  title: string
  description?: string
  completed: boolean
  createdAt: number
  category?: string
}