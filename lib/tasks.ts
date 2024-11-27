import { Task } from "@/types/task";

const STORAGE_KEY = "tasks";

// Helper to get tasks from localStorage
export function getTasks(): Task[] {
  if (typeof window === "undefined") return [];
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
}

// Helper to save tasks to localStorage
export function saveTasks(tasks: Task[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Add a new task
export function addTask(title: string, description: string, dueDate: Date | null, assignee: string, priority: string): Task {
  const tasks = getTasks();
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    description,
    completed: false,
    dueDate: dueDate ? dueDate.toISOString() : null,
    createdAt: new Date().toISOString(),
    assignee,
    priority,
  };
  
  tasks.unshift(newTask);
  saveTasks(tasks);
  return newTask;
}

// Toggle task completion
export function toggleTask(taskId: string) {
  const tasks = getTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks(updatedTasks);
}

// Delete a task
export function deleteTask(taskId: string) {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  saveTasks(updatedTasks);
}

// Update task due date
export function updateTaskDueDate(taskId: string, dueDate: Date | null) {
  const tasks = getTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, dueDate: dueDate?.toISOString() ?? null } : task
  );
  saveTasks(updatedTasks);
}

// Update an existing task
export function updateTask(updatedTask: Task) {
  const tasks = getTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(updatedTasks);
}
