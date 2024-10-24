"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string | null;
}

export function TaskList() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
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

  const toggleTask = async (taskId: string, completed: boolean) => {
    await updateDoc(doc(db, "tasks", taskId), { completed });
  };

  const deleteTask = async (taskId: string) => {
    await deleteDoc(doc(db, "tasks", taskId));
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-card flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={task.completed}
              onCheckedChange={(checked) => toggleTask(task.id, checked as boolean)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span className={`transition-all duration-200 ${
              task.completed 
                ? "line-through text-muted-foreground" 
                : "text-foreground"
            }`}>
              {task.title}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {task.dueDate && (
              <div className="flex items-center text-sm text-primary/80">
                <Calendar className="w-4 h-4 mr-1" />
                {format(new Date(task.dueDate), "MMM d")}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task.id)}
              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="text-center text-muted-foreground py-12 px-4 border-2 border-dashed rounded-lg">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-primary/50" />
          <p className="text-lg font-medium">No tasks yet</p>
          <p className="text-sm">Add some tasks to get started!</p>
        </div>
      )}
    </div>
  );
}