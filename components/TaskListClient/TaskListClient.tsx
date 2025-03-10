'use client';

import { useState } from 'react';
import TodaysTask from '@/components/TodaysTask/TodaysTask';
import { Task } from '@/app/types/Tasks';

type TaskListClientProps = {
  initialTasks: Task[];
};

export default function TaskListClient({ initialTasks }: TaskListClientProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showCompleted, setShowCompleted] = useState(false);
  const handleTaskUpdate = async (id: string, status: "NOT_STARTED" | "IN_PROGRESS" | "DONE") => { // ✅ Expect status instead of boolean
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status } : task
      )
    );
  
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };  
  // Filter tasks: if showCompleted is false, only show active tasks.
  const filteredTasks = tasks.filter(task => showCompleted || !task.completed);

   return (
      <TodaysTask
        tasks={filteredTasks}
        onTaskUpdate={handleTaskUpdate}
        showCompleted={showCompleted}
        toggleShowCompleted={() => setShowCompleted((prev) => !prev)}
      />
  );
}
