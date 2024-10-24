import { TaskDashboard } from "@/components/task/task-dashboard";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Dashboard</h1>
          <p className="text-muted-foreground">Manage your tasks and schedule efficiently.</p>
        </div>
      </div>
      <TaskDashboard />
    </div>
  );
}