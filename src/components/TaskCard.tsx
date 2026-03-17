import type { Task } from "@/types/task"

type Props = {
    task: Task
}

const TaskCard = ({ task }: Props) => {
    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
        </div>
    )
}

export default TaskCard