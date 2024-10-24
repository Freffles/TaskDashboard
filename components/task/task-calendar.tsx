"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Calendar } from "@/components/ui/calendar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string | null;
}

export function TaskCalendar() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(taskData);
    });

    return () => unsubscribe();
  }, [user]);

  const getTasksForDate = (date: Date) => {
    return tasks.filter(
      (task) =>
        task.dueDate &&
        format(new Date(task.dueDate), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border border-primary/20"
        modifiers={{
          taskDay: (date) => getTasksForDate(date).length > 0,
        }}
        modifiersStyles={{
          taskDay: { 
            fontWeight: "bold",
            color: "hsl(var(--primary))",
            backgroundColor: "hsl(var(--primary) / 0.1)"
          },
        }}
        components={{
          DayContent: ({ date }) => {
            const dayTasks = getTasksForDate(date);
            return (
              <HoverCard>
                <HoverCardTrigger>
                  <div className="w-full h-full flex items-center justify-center">
                    {date.getDate()}
                    {dayTasks.length > 0 && (
                      <span className="task-dot absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </div>
                </HoverCardTrigger>
                {dayTasks.length > 0 && (
                  <HoverCardContent className="w-80 p-4 bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-primary/20">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">
                        Tasks for {format(date, "MMMM d, yyyy")}
                      </h4>
                      <div className="space-y-2">
                        {dayTasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center space-x-2 p-2 rounded-md hover:bg-primary/5 transition-colors"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                task.completed 
                                  ? "bg-green-500 animate-pulse" 
                                  : "bg-primary"
                              }`}
                            />
                            <span
                              className={
                                task.completed 
                                  ? "line-through text-muted-foreground" 
                                  : ""
                              }
                            >
                              {task.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </HoverCardContent>
                )}
              </HoverCard>
            );
          },
        }}
      />
    </div>
  );
}