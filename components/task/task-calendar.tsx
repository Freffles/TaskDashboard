"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/types/task";
import { getTasks, toggleTask, deleteTask } from "@/lib/tasks";
import { format, isSameDay } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function TaskCalendar() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    // Initial load
    setTasks(getTasks());

    // Setup event listener for storage changes
    const handleStorageChange = () => {
      setTasks(getTasks());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleToggle = (taskId: string) => {
    toggleTask(taskId);
    setTasks(getTasks());
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
    setTasks(getTasks());
  };

  // Get tasks for selected date
  const selectedTasks = tasks.filter((task) =>
    task.dueDate ? isSameDay(new Date(task.dueDate), selectedDate) : false
  );

  // Get dates with tasks for calendar highlighting
  const datesWithTasks = tasks
    .filter((task) => task.dueDate)
    .map((task) => new Date(task.dueDate!));

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-auto">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="rounded-md border"
          modifiers={{ booked: datesWithTasks }}
          modifiersStyles={{
            booked: {
              fontWeight: "bold",
              backgroundColor: "hsl(var(--primary) / 0.1)",
              color: "hsl(var(--primary))",
            },
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="mb-4">
          <h2 className="text-lg font-medium">
            Tasks for {format(selectedDate, "MMMM d, yyyy")}
          </h2>
        </div>

        <div className="space-y-4">
          {selectedTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between space-x-4 rounded-lg border border-primary/10 p-4 transition-colors hover:bg-primary/5"
            >
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleToggle(task.id)}
                  className="border-primary/20 data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary"
                />
                <p className={task.completed ? "line-through text-muted-foreground" : ""}>
                  {task.title}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(task.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {selectedTasks.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No tasks scheduled for this day.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}