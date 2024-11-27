"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Plus, User, Flag } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { addTask, getTasks, updateTask } from "@/lib/tasks";
import { Task } from "@/types/task";

interface TaskDialogProps {
  task?: Task | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TaskDialog({ task, open: controlledOpen, onOpenChange }: TaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>();
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("");

  // Reset form when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.dueDate ? new Date(task.dueDate) : undefined);
      setAssignee(task.assignee || "");
      setPriority(task.priority || "");
    } else {
      setTitle("");
      setDescription("");
      setDate(undefined);
      setAssignee("");
      setPriority("");
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskDate = date || new Date();
    
    if (task) {
      // Update existing task
      updateTask({
        ...task,
        title: title.trim(),
        description: description.trim(),
        dueDate: taskDate.toISOString(),
        assignee: assignee.trim(),
        priority: priority.trim(),
      });
    } else {
      // Add new task
      addTask(title.trim(), description.trim(), taskDate, assignee.trim(), priority.trim());
    }
    
    // Clear the form and close the dialog
    setTitle("");
    setDescription("");
    setDate(undefined);
    setAssignee("");
    setPriority("");
    
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setOpen(false);
    }
  };

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : open;
  const onOpen = isControlled ? onOpenChange : setOpen;

  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            <DialogDescription>
              {task ? 'Edit your task details below.' : 'Create a new task with title, description, and due date.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40"
              />
            </div>
            <div className="grid gap-2">
              <Textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Assignee"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <Flag className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    className={cn(
                      "w-full flex items-center justify-start gap-2",
                      "bg-white hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800",
                      "border border-gray-200 dark:border-gray-800",
                      "text-left font-normal transition-colors duration-200",
                      "h-10 px-3 py-2",
                      date ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="h-4 w-4 shrink-0" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-950" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {task ? 'Save Changes' : 'Add Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}