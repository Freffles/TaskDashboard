"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TaskInput() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim()) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title: title.trim(),
        completed: false,
        dueDate: date ? date.toISOString() : null,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDate(undefined);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40 transition-colors"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[180px] justify-start text-left font-normal bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a due date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className="rounded-md border-primary/20"
          />
        </PopoverContent>
      </Popover>
      <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
        <Plus className="w-4 h-4 mr-1" />
        Add Task
      </Button>
    </form>
  );
}