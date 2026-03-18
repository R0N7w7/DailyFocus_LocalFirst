import { useState, type FormEvent } from "react";
import TaskItem from "@/components/TaskItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddTask, useTasks } from "@/queries/task.queries";
import type { Task } from "@/types/task";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, ListChecks, Plus, TimerReset } from "lucide-react";

export const HomePage = () => {
    const tasksQuery = useTasks();
    const addTask = useAddTask();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

    const tasks = tasksQuery.data ?? [];

    const filteredTasks = tasks
        .filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
        })
        .sort((a, b) => b.createdAt - a.createdAt);

    const totalTasks = tasks.length;
    const totalCompleted = tasks.filter((t) => t.completed).length;
    const totalPending = totalTasks - totalCompleted;

    const handleAddTask = (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        if (!title.trim()) return;

        const newTask: Omit<Task, "id"> = {
            title: title.trim(),
            description: description.trim(),
            completed: false,
            createdAt: Date.now(),
        };

        addTask.mutate(newTask);
        setTitle("");
        setDescription("");
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6 py-4 md:py-8">
            <Card className="shadow-md backdrop-blur-sm">
                <CardHeader className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <Badge variant="secondary" className="rounded-full bg-cyan-100 px-3 py-1 text-cyan-700">
                            Daily Focus
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                            {new Date().toLocaleDateString("es-ES", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                            })}
                        </p>
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                            Tus tareas del dia
                        </CardTitle>
                        <CardDescription className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">
                            Enfocate en lo importante. Crea, completa y limpia pendientes con una vista clara.
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>

            <form onSubmit={handleAddTask}>
                <Card className="shadow-md backdrop-blur-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-slate-800">Agregar tarea</CardTitle>
                        <CardDescription>Registra una accion concreta para avanzar hoy.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Input
                            placeholder="Ej: Enviar propuesta al cliente"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-11 bg-white"
                        />
                        <Textarea
                            placeholder="Detalles opcionales"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-20 resize-none bg-white"
                        />
                        <Button
                            type="submit"
                            className="w-full h-11 bg-slate-900 text-white hover:bg-slate-800"
                            disabled={addTask.isPending || !title.trim()}
                        >
                            <Plus className="h-4 w-4" />
                            {addTask.isPending ? "Guardando..." : "Anadir tarea"}
                        </Button>
                    </CardContent>
                </Card>
            </form>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Card className="bg-white/80 py-4 shadow-md">
                    <CardContent className="flex items-center gap-3 px-4">
                        <div className="rounded-full bg-slate-100 p-2 text-slate-700">
                            <ListChecks className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Total</p>
                            <p className="text-2xl font-bold text-slate-900">{totalTasks}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="py-4 shadow-md">
                    <CardContent className="flex items-center gap-3 px-4">
                        <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                            <CheckCheck className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-emerald-700/80">Completadas</p>
                            <p className="text-2xl font-bold text-emerald-700">{totalCompleted}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="py-4 shadow-md">
                    <CardContent className="flex items-center gap-3 px-4">
                        <div className="rounded-full bg-amber-100 p-2 text-amber-700">
                            <TimerReset className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-amber-700/80">Pendientes</p>
                            <p className="text-2xl font-bold text-amber-700">{totalPending}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs
                value={filter}
                onValueChange={(value) =>
                    setFilter(value as "all" | "completed" | "pending")
                }
                className="w-full"
            >
                <TabsList className="grid h-auto w-full grid-cols-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-md">
                    <TabsTrigger value="all" className="text-sm">
                        Todas
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="text-sm">
                        Completadas
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="text-sm">
                        Pendientes
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <Card className="border-white/70 bg-white/80 shadow-sm backdrop-blur-sm">
                <CardContent className="space-y-3 p-4 md:p-5">
                    {tasksQuery.isLoading ? (
                        <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
                            Cargando tareas...
                        </div>
                    ) : filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))
                    ) : (
                        <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
                            {filter === "all" && "No tienes tareas aun. Empieza agregando tu primer objetivo."}
                            {filter === "completed" && "Todavia no completaste tareas."}
                            {filter === "pending" && "Nada pendiente. Gran trabajo por hoy."}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};