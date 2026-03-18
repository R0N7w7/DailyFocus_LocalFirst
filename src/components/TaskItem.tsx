import type { Task } from "@/types/task";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDeleteTask, useUpdateTask } from "@/queries/task.queries";
import { Trash2, CheckCircle2, Circle, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Props = {
    task: Task;
};

const TaskItem = ({ task }: Props) => {
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();

    const handleToggle = (id: number) => {
        updateTask.mutate({ id, updates: { completed: !task.completed } });
    };

    const handleDelete = (id: number) => {
        deleteTask.mutate(id);
    };

    const createdAtLabel = new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(task.createdAt);

    return (
        <Card
            className={cn(
                "group border transition-all duration-200",
                "border-slate-200/80 bg-white/90 hover:-translate-y-0.5 hover:shadow-md",
                task.completed && "border-emerald-200 bg-emerald-50/60"
            )}
        >
            <CardContent className="flex items-center gap-4 px-4 py-3">

                {/* Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => task.id !== undefined && handleToggle(task.id)}
                    disabled={updateTask.isPending}
                    aria-label={
                        task.completed
                            ? "Marcar como no completada"
                            : "Marcar como completada"
                    }
                    className={cn(
                        "shrink-0 rounded-full transition",
                        task.completed
                            ? "text-emerald-600 hover:text-emerald-700"
                            : "text-muted-foreground hover:text-primary"
                    )}
                >
                    {task.completed ? (
                        <CheckCircle2 className="w-5 h-5" />
                    ) : (
                        <Circle className="w-5 h-5" />
                    )}
                </Button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                        <p
                            className={cn(
                                "font-semibold leading-tight transition",
                                task.completed
                                    ? "line-through text-muted-foreground"
                                    : "text-slate-900"
                            )}
                        >
                            {task.title}
                        </p>
                        <Badge variant={task.completed ? "success" : "warning"}>
                            {task.completed ? "Completada" : "Pendiente"}
                        </Badge>
                    </div>

                    {task.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                            {task.description}
                        </p>
                    )}

                    <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock3 className="h-3.5 w-3.5" />
                        {createdAtLabel}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            task.id !== undefined && handleDelete(task.id)
                        }
                        disabled={deleteTask.isPending}
                        aria-label="Eliminar tarea"
                        className="opacity-90 transition hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default TaskItem;