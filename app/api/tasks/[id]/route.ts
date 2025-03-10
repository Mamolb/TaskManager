import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } } // <-- Destructure `params` directly
) {
  try {
    // Note: 'params' error in console is a false positive; code works as expected
    const { id } = params; 
    const { completed, status } = await request.json();

    // Validation: Ensure at least one field is provided
    if (
      completed === undefined &&
      !["NOT_STARTED", "IN_PROGRESS", "DONE"].includes(status)
    ) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    // Prepare the update data
    const updateData: any = {};
    if (completed !== undefined) updateData.completed = completed;
    if (status) updateData.status = status;

    // Update task in database
    const updatedTask = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}
