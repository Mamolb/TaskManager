import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import styles from './Home.module.css';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome to Task-Manager</h1>
      <p className={styles.subtitle}>Manage your tasks efficiently</p>
      {/* Navigation Button */}
      <Link href="/tasks">
        <button className={styles.button}>Go to Tasks</button>
      </Link>
    </main> 
  );
}
