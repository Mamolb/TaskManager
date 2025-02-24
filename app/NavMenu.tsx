import Link from 'next/link';
import Image from 'next/image';
import styles from './NavMenu.module.css';

export default function NavMenu() {
  return (
    <nav className={styles.sidebar}>
    
      <div className={styles.logo}>
      <Link href = {'/'}>
        <Image
          src="/task-management-svgrepo-com.svg"
          alt="Vercel Logo"
          width={72}
          height={40}
        />
        </Link>
        <span className={styles.title}>Task Manager</span>
      </div>
      <ul className={styles.links}>
        <li>
          <Link href="/oversikt">Oversikt</Link>
        </li>
        <li>
          <Link href="/tasks">Tasks</Link>
        </li>
        <li>
          <Link href="/calendar">Calendar</Link>
        </li>
        <li>
          <Link href="/user">User</Link>
        </li>
      </ul>
    </nav>
  );
}
