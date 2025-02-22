import styles from "./TaskSummery.module.css";

type TaskSummaryProps = {
  totalTasks: number;
  completedTasks: number;
  dueToday: number;
  inProgress: number;
  upcoming: number;
};

const TaskSummary = ({ totalTasks, completedTasks, dueToday, inProgress, upcoming }: TaskSummaryProps) => {
  return (
    <div className={styles.taskSummaryContainer}>
      {TaskCard("Total Tasks", totalTasks, `${completedTasks} completed`, "📦")}
      {TaskCard("Due Today", dueToday, `${inProgress} in progress`, "⏳")}
      {TaskCard("Upcoming", upcoming, "Next 7 days", "📅")}
    </div>
  );
};

// Helper function to create task cards
function TaskCard(title: string, value: number, description: string, emoji: string) {
  return (
    <div className={styles.taskCard} key={title}>
      <div className={styles.taskCardHeader}>
        <h4>{title}</h4>
        <i className={styles.emoji}>{emoji}</i>
      </div>
      <p className={styles.taskCount}>{value}</p>
      <p className={styles.taskDescription}>{description}</p>
    </div>
  );
}

export default TaskSummary;
