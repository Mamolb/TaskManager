// /app/api/tasks/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { completed } = await request.json();
    // Await the params before using them:
    const { id } = await context.params;
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
  }
}
