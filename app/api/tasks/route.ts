// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request){
  // Verify that the user is authenticated.
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id){
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }
  //Parse the incoming data(for now just the title)
  const {title} = await request.json();
  try
  {
    //Create a new task
    const task = await prisma.task.create({
        data: {
            title,
            completed: false,
            userId: session.user.id
        },
    });
    return NextResponse.json(task, { status: 201 });
  }
  catch(error){
    console.error("Error creating task:", error);
    return NextResponse.error();
  }
}

