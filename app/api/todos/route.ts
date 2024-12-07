import { NextRequest } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Todo from '@/app/models/Todo';

export async function GET(): Promise<Response> {
  await dbConnect();

  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    console.log('Current tenantId:', tenantId);

    const todos = await Todo.find({ tenantId });
    console.log('Found todos:', todos);

    return Response.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    return Response.json(
      { 
        error: 'Failed to fetch todos',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    console.log('받은 데이터:', body);

    const todoData = {
      ...body,
      tenantId: process.env.TENANT_ID,
      isCompleted: false
    };

    console.log('저장할 데이터:', todoData);
    const todo = await Todo.create(todoData);
    
    return Response.json(todo, { status: 201 });
  } catch (error: any) {
    console.error('Todo 생성 에러:', {
      message: error.message,
      code: error.code
    });
    return Response.json(
      { error: 'Failed to create todo', details: error.message },
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