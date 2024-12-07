import { NextRequest } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Todo from '@/app/models/Todo';

type Context = {
  params: {
    id: string;
  };
};

export async function POST(
  request: NextRequest,
  context: Context
): Promise<Response> {
  await dbConnect();

  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image || !image.type.startsWith('image/')) {
      return new Response(
        JSON.stringify({ error: 'Invalid image file' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const imageUrl = '/temp-image-url';

    const updatedTodo = await Todo.findByIdAndUpdate(
      context.params.id,
      { $set: { imageUrl } },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return new Response(
        JSON.stringify({ error: 'Todo not found' }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ imageUrl }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Image upload error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to upload image' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 