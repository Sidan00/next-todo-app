import { NextRequest } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Todo from '@/app/models/Todo';

export async function GET(): Promise<Response> {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected');

    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    console.log('TenantId:', tenantId);

    const todos = await Todo.find({ tenantId });
    console.log('Todos found:', todos);

    return Response.json(todos);
  } catch (error) {
    console.error('Detailed error:', error);
    return Response.json(
      { 
        error: 'Failed to fetch todos',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }, 
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<Response> {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected');

    const body = await request.json();
    console.log('Request body:', body);

    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    console.log('TenantId:', tenantId);

    const todo = await Todo.create({
      ...body,
      tenantId
    });
    console.log('Created todo:', todo);

    return Response.json(todo);
  } catch (error) {
    console.error('Detailed error:', error);
    return Response.json(
      { 
        error: 'Failed to create todo',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }, 
      { status: 500 }
    );
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