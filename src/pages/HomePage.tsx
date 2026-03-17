import { useState } from "react"
import TaskItem from "@/components/TaskItem"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddTask, useTasks} from "@/queries/task.queries";
import type { Task } from "@/types/task";

export const HomePage = () => {
    const tasksQuery = useTasks();
    const addTask = useAddTask();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    if (tasksQuery.isLoading) {
        return <div>Loading...</div>
    }

    const handleAddTask = () => {
        if (!title.trim()) return

        const newTask: Omit<Task, 'id'> = {
            title: title.trim(),
            description: description.trim(),
            completed: false,
            createdAt: Date.now(),
        }

        addTask.mutate(newTask)
        setTitle("")
        setDescription("")
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Lista de tareas</h1>

            <div className="flex gap-2">
                <Input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Input placeholder="Descripción (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Button onClick={handleAddTask}>Añadir</Button>
            </div>

            <div className="grid gap-2">
                {tasksQuery.data?.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}