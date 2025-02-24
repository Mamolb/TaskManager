import styles from "./TodaysTask.module.css";
import { Task } from "@/app/types/Tasks";

type TodaysTaskProps = {
    tasks: Task[];
    onTaskUpdate: (id: string, completed: boolean) => void;
};

const TodaysTask = ({ tasks, onTaskUpdate }: TodaysTaskProps) => {
    return (
        <div className={styles.taskContainer}>
        <h2>Today's Tasks</h2>
        <div className={styles.taskList}>
            {tasks.map((task) => (
                <div key={task.id} className={styles.taskCard}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => onTaskUpdate(task.id, e.target.checked)}
                    />
                    <div className={styles.taskInfo}>
                        <h4>{task.title}</h4>
                        <p>{task.description || "No description provided"}</p>
                    </div>
                    <p className={styles.taskDue}>
                        Due: {task.dueDate ? new Date(task.dueDate).toDateString() : "No due date"}
                    </p>
                </div>
            ))}
        </div>
    </div>
    );
};


export default TodaysTask;
