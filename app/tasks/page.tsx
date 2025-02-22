
import {getServerSession} from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';
import styles from "./Task.module.css";
import TaskSummery from '@/components/TaskSummery/TaskSummery';
import AddTaskButton from '@/components/AddTaskButton/AddTaskButton'; 

export default async function TaskPage(){
    //Checks if the user is signed in 
    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect('/api/auth/signin');
    }
    //Fetch all tasks from the database that matches the userId
    const tasks = await prisma.task.findMany({
        where: {
            userId: session.user.id
        }
    });

    //Filtrate the info
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;

    //Noe sånn her for å sjekke kommende tasks(må legge til dueDate i databasen)

    const dueToday = tasks.filter((t) => {
        // check if dueDate is today
        return t.dueDate && isToday(t.dueDate); //Må enten lage eller finne isToday
      }).length;
    const upcoming = tasks.filter((t) => {
        // e.g. check if dueDate is in the next 7 days
        return t.dueDate && isWithinNext7Days(t.dueDate);
      }).length;

    return (
        <main className={styles.dashboardContainer}>
        <header className = {styles.topBar}>
            <h1 className = {styles.welcomeText}>Welcome back, {session.user?.name} </h1>
            <AddTaskButton />
            </header>
            <TaskSummery
                totalTasks={totalTasks}
                completedTasks={completedTasks}
                dueToday={dueToday}
                inProgress={totalTasks - completedTasks - dueToday - upcoming}
                upcoming={upcoming}
            />
      </main> 
      );
}

export function isToday(date: any){
    if(!date) return false;
    const today = new Date();
    const taskDate = new Date(date);
    return (
        today.getFullYear() === taskDate.getFullYear() &&
        today.getMonth() === taskDate.getMonth() &&
        today.getDate() === taskDate.getDate()
    );
}

export function isWithinNext7Days(date: any){
    if(!date) return false;
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const taskDate = new Date(date);
    return (
        taskDate >= today && taskDate <= nextWeek
    );
}




