"use client";

import { useState } from "react";
import { TaskList } from "./task-list";
import { TaskCalendar } from "./task-calendar";
import { TaskInput } from "./task-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export function TaskDashboard() {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <TaskInput />
      </Card>
      <Card className="bg-gradient-to-b from-card to-card/50">
        <Tabs defaultValue="list" className="p-4">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 bg-muted/50">
            <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              List View
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Calendar
            </TabsTrigger>
          </TabsList>
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