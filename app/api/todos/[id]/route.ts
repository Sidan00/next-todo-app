import { NextRequest } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Todo from '@/app/models/Todo';

export async function GET(
  request: NextRequest
): Promise<Response> {
  const id = request.url
    ? new URL(request.url).pathname.split('/').pop() || ''
    : '';
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
  request: NextRequest
): Promise<Response> {
  const id = request.url
    ? new URL(request.url).pathname.split('/').pop() || ''
    : '';
  await dbConnect();

  try {
    const body = await request.json();
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { ...body },
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

export async function DELETE(
  request: NextRequest
): Promise<Response> {
  const id = request.url
    ? new URL(request.url).pathname.split('/').pop() || ''
    : '';
  await dbConnect();

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    
    if (!deletedTodo) {
      return Response.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    return Response.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return Response.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
} 