import { NextRequest } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Todo from '@/app/models/Todo';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  await dbConnect();

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return Response.json({ error: 'Todo not found' }, { status: 404 });
    }
    return Response.json(todo);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch todo' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  await dbConnect();

  try {
    const body = await request.json();
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    
    if (!updatedTodo) {
      return Response.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    return Response.json(updatedTodo);
  } catch (error) {
    return Response.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    await Todo.findOneAndDelete({ _id: params.id, tenantId: process.env.tenantId });
    return new Response(null, { status: 204 });
  } catch (error) {
    return Response.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
} 