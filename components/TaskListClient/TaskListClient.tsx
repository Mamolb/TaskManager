'use client';

import { useState } from 'react';
import TodaysTask from '@/components/TodaysTask/TodaysTask';
import { Task } from '@/app/types/Tasks';

type TaskListClientProps = {
  initialTasks: Task[];
};

export default function TaskListClient({ initialTasks }: TaskListClientProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleTaskUpdate = async (id: string, completed: boolean) => {
    // Optimistically update UI
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed } : task
      )
    );

    // Make API call to update the task in the database
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      // Optionally revert UI changes on error
    }
  };
  return <TodaysTask tasks={tasks} onTaskUpdate={handleTaskUpdate} />;
}
