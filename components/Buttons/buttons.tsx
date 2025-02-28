'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './buttons.module.css';

export function GetStartedButton(){
    return <button>Get started</button>
}

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated') {
    return (
      <Link href={`/dashboard`}>
        <Image
          src={'/mememan.webp'}
          width={32}
          height={32}
          alt="Your Name"
        />
      </Link>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}
export function SignOutButton() {
    const { data: session, status } = useSession();
  
    if (status === 'loading') {
      return <>...</>;
    }
  
    if (status === 'authenticated') {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem', width: '100%' }}>
            <Link href={`/user`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', width: '100%' }}>
              <Image
                src={session.user?.image ?? '/mememan.webp'}
                width={40}
                height={40}
                alt="Your Name"
                style={{ borderRadius: '50%' }}
              />
              <span style={{ color: 'white', fontSize: '1rem' }}>
                {session.user?.name ?? 'Unknown User'}
              </span>
            </Link>
            <button className = {styles.signoutbtn} onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        );
    }
    
    return <button onClick={() => signOut()}>Sign out</button>;
  }