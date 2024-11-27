"use client";

import { useState } from "react";
import { TaskList } from "./task-list";
import { TaskCalendar } from "./task-calendar";
import { TaskDialog } from "./task-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TaskDashboard() {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-b from-card to-card/50">
        <Tabs defaultValue="list" className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <TaskDialog />
            <TabsList className="grid flex-1 max-w-[400px] grid-cols-2 gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <TabsTrigger 
                value="list" 
                className={cn(
                  "rounded-md transition-all duration-200",
                  "border border-gray-300 dark:border-gray-600",
                  "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950",
                  "data-[state=active]:text-primary dark:data-[state=active]:text-primary",
                  "data-[state=active]:border-primary dark:data-[state=active]:border-primary",
                  "data-[state=active]:shadow-sm",
                  "hover:bg-white/80 dark:hover:bg-gray-900/80",
                  "hover:border-primary/50 dark:hover:border-primary/50",
                  "hover:text-primary dark:hover:text-primary",
                  "data-[state=active]:hover:bg-white dark:data-[state=active]:hover:bg-gray-950",
                  "data-[state=active]:hover:border-primary dark:data-[state=active]:hover:border-primary"
                )}
              >
                List View
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className={cn(
                  "rounded-md transition-all duration-200",
                  "border border-gray-300 dark:border-gray-600",
                  "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950",
                  "data-[state=active]:text-primary dark:data-[state=active]:text-primary",
                  "data-[state=active]:border-primary dark:data-[state=active]:border-primary",
                  "data-[state=active]:shadow-sm",
                  "hover:bg-white/80 dark:hover:bg-gray-900/80",
                  "hover:border-primary/50 dark:hover:border-primary/50",
                  "hover:text-primary dark:hover:text-primary",
                  "data-[state=active]:hover:bg-white dark:data-[state=active]:hover:bg-gray-950",
                  "data-[state=active]:hover:border-primary dark:data-[state=active]:hover:border-primary"
                )}
              >
                Calendar
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="list" className="mt-4">
            <TaskList />
          </TabsContent>
          <TabsContent value="calendar" className="mt-4">
            <TaskCalendar />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}