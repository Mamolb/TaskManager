"use client";

import { useState } from "react";
import { Task } from "@/app/types/Tasks";
import styles from "./AddTaskModal.module.css";

export interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (task: Task) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with title:", title);

    try{
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title}),
        });
        if(!res.ok){
            console.log("Error creating task:", await res.text());
            return;
        }
        const newTask: Task = await res.json();
        onAdd(newTask);
    }
    catch(error){
        console.error("Error creating task:", error);
    }
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
