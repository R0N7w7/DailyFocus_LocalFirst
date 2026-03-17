import React from "react"
import type { Task } from "@/types/task"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDeleteTask, useUpdateTask } from "@/queries/task.queries"

type Props = {
    task: Task
}

const TaskItem = ({ task }: Props) => {

    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();

    const handleToggle = (id: number) => {
        updateTask.mutate({ id, updates: { completed: !task.completed } })
    }

    const handleDelete = (id: number) => {
        deleteTask.mutate(id)
    }

    return (
        <Card className="flex items-center justify-between">
            <div className="flex items-center gap-4 px-4 py-2 w-full">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => task.id !== undefined && handleToggle(task.id)}
                    className="h-5 w-5"
                />
                <div className="flex-1">
                    <div className={`${task.completed ? "line-through text-gray-400" : ""} font-medium`}>{task.title}</div>
                    {task.description && <div className="text-sm text-muted-foreground">{task.description}</div>}
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => task.id !== undefined && handleDelete(task.id)}>
                        Eliminar
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default TaskItem
