import { taskService } from "@/services/taskService"
import type { Task } from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: () => taskService.getAllTasks(),
    });
}

export const useTask = (id: number) => {
    return useQuery({
        queryKey: ['task', id],
        queryFn: () => taskService.getTaskById(id),
    });
}

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask: Omit<Task, 'id'>) => taskService.addTask(newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Omit<Task, 'id'>> }) =>
            taskService.updateTask(id, updates),

        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['task', id] })
        }
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => taskService.deleteTask(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['task', id] })
        }
    })
}