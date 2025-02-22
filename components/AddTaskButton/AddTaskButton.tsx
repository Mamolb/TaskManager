"use client";

import { useState } from "react";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import { Task } from "@/app/types/Tasks";
import styles from "./AddTaskButton.module.css";

export default function AddTaskButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleSaveTask = (task: Task) => {
      console.log("New Task in Perant:", task);
      // Optionally, update local state or trigger a revalidation of tasks.
    };
  
    return (
      <>
        <button onClick={() => setIsModalOpen(true)} className={styles.addTaskButton}>
          + Add Another Task
        </button>
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleSaveTask}
        />
      </>
    );
  }
  