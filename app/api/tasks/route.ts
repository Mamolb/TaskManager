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
  const {title, description, dueTime} = await request.json();
  //Check if we got any valid input
  if (!title) {
    return NextResponse.json(
      { error: "Title is required." },
      { status: 400 }
    );
  }

  try
  {
    //Create a new task in database
    const task = await prisma.task.create({
        data: {
            title,
            description: description || null,//Optional description set to null if not provided
            dueDate: dueTime ? new Date(dueTime) : null,//Optional dueTime/Date set to null if not provided
            completed: false, //TODO: REMOVE AFTER IMPLEMENTATION OF STATUS
            status: "NOT_STARTED", //All tasks start as not started
            userId: session.user.id
        },
    });
    return NextResponse.json(task, { status: 201 });
  }
  catch(error){
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

