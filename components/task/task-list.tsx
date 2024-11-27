"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, Pencil, User, Flag } from "lucide-react";
import { format } from "date-fns";
import { Task } from "@/types/task";
import { getTasks, toggleTask, deleteTask } from "@/lib/tasks";
import { TaskDialog } from "./task-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Function to refresh tasks
  const refreshTasks = () => {
    setTasks(getTasks());
  };

  useEffect(() => {
    // Initial load
    refreshTasks();

    // Setup event listener for storage changes
    const handleStorageChange = () => {
      refreshTasks();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Set up interval to check for updates
    const interval = setInterval(refreshTasks, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleToggle = (taskId: string) => {
    toggleTask(taskId);
    refreshTasks();
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
    refreshTasks();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={cn(
              "transition-all hover:shadow-md h-[fit-content]",
              task.completed ? "opacity-75" : ""
            )}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between space-x-4">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggle(task.id)}
                    className="mt-1 border-primary/20 data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary"
                  />
                  <div className="space-y-1">
                    <CardTitle className={cn(
                      "text-base font-semibold line-clamp-1",
                      task.completed && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {task.dueDate && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>{format(new Date(task.dueDate), "PPP")}</span>
                        </div>
                      )}
                      {task.assignee && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <User className="mr-1 h-3 w-3" />
                          <span>{task.assignee}</span>
                        </div>
                      )}
                      {task.priority && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Flag className="mr-1 h-3 w-3" />
                          <span>{task.priority}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTaskToEdit(task)}
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(task.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {task.description && (
              <CardContent>
                <p className={cn(
                  "text-sm text-muted-foreground line-clamp-2",
                  task.completed && "line-through"
                )}>
                  {task.description}
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No tasks yet. Add one above!
        </div>
      )}
      
      <TaskDialog 
        task={taskToEdit} 
        open={!!taskToEdit} 
        onOpenChange={(open) => !open && setTaskToEdit(null)} 
      />
    </div>
  );
}