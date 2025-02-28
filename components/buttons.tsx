'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
              <Link href={`/user`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                <Image
                  src={session.user?.image ?? '/mememan.webp'}
                  width={40}
                  height={40}
                  alt="Your Name"
                  style={{ borderRadius: '50%' }}
                />
                <span style={{ color: 'white', fontSize: '1rem', marginTop: '0.25rem' }}>
                  {session.user?.name ?? 'Unknown User'}
                </span>
              </Link>
              <button onClick={() => signOut()} style={{ marginTop: '0.5rem' }}>Sign out</button>
            </div>
          );
    }
    
    return <button onClick={() => signOut()}>Sign out</button>;
  }