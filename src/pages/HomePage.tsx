import TaskCard from "@/components/TaskCard"
import { Button } from "@/components/ui/button";
import { useAddTask, useTasks } from "@/queries/task.queries";
import type { Task } from "@/types/task";

export const HomePage = () => {
    const task = useTasks();
    const addTask = useAddTask();

    if (task.isLoading) {
        return <div>Loading...</div>
    }

    const handleAddTask = () => {
        // mock adding a task
        const newTask: Task = {
            title: "New Task",
            description: "This is a new task",
            completed: false,
            createdAt: 0
        }

        addTask.mutate(newTask);
    }

    return (
        <div>
            <h1>Home Page</h1>
            <ul>
                {task.data?.map((task) => (
                    <li key={task.id}>
                        <TaskCard task={task} />
                    </li>
                ))}
            </ul>
            <Button onClick={handleAddTask}>Add Task</Button>
        </div>
    )
}