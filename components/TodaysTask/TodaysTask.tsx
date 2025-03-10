import styles from "./TodaysTask.module.css";
import { Task } from "@/app/types/Tasks";

type TodaysTaskProps = {
    tasks: Task[];
    onTaskUpdate: (id: string, status: "NOT_STARTED" | "IN_PROGRESS" | "DONE") => void; 
    showCompleted: boolean;
    toggleShowCompleted: () => void;
  };

const TodaysTask = ({ tasks, onTaskUpdate, showCompleted, toggleShowCompleted}: TodaysTaskProps) => {
    return (
        <div className={styles.taskContainer}>
        <h2>Today's Tasks</h2>

        {/* Show Completed Button */}
        <button className={styles.showCompletedButton} onClick={toggleShowCompleted}>
            {showCompleted ? "Hide Completed" : "Show Completed"}
        </button>

        {tasks.length === 0 ? (
            <p>No tasks for today</p>
        ) :
        (
        <div className={styles.taskList}>
            {tasks.map((task) => (
                <div key={task.id} className={styles.taskCard}>
                   <input
                    type="checkbox"
                    checked={task.status === "DONE"}
                    onChange={(e) =>
                        onTaskUpdate(task.id, e.target.checked ? "DONE" : "IN_PROGRESS") 
                    }
                    />
                    <div className={styles.taskInfo}>
                        <h4>{task.title}</h4>
                        <p>{task.description || "No description provided"}</p>
                    </div>
                    <p className={styles.taskDue}>
                        Due: {task.dueDate ? new Date(task.dueDate).toDateString() : "No due date"}
                    </p>
                     {/* New Dropdown for Task Status */}
                     <select
                    className={styles.taskStatus}
                    value={task.status}
                    onChange={(e) => onTaskUpdate(task.id, e.target.value as "NOT_STARTED" | "IN_PROGRESS" | "DONE")} // ✅ Fix: Explicitly cast `e.target.value`
                    >
                    <option value="NOT_STARTED">Not Started</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                    </select>
                </div>
            ))}
        </div>
        )}
    </div>
    );
};


export default TodaysTask;
