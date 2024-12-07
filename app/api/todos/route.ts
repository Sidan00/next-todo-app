import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/app/lib/mongodb';
import Todo from '@/app/models/Todo';

const tenantId = process.env.tenantId;

export async function GET() {
  await dbConnect();

  try {
    const todos = await Todo.find({ tenantId });
    return Response.json(todos);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const todo = await Todo.create({ ...body, tenantId });
    return Response.json(todo, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}

export async function PUT() {
  // PUT 요청 처리
}

export async function DELETE() {
  // DELETE 요청 처리
}

export async function PATCH(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const updatedTodo = await Todo.findByIdAndUpdate(
      body.id,
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