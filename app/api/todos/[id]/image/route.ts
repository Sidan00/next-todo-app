import { NextRequest } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Todo from '@/app/models/Todo';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image || !image.type.startsWith('image/')) {
      return Response.json(
        { error: 'Invalid image file' },
        { status: 400 }
      );
    }
    
    const imageUrl = '/temp-image-url';

    const updatedTodo = await Todo.findByIdAndUpdate(
      params.id,
      { $set: { imageUrl } },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return Response.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return Response.json({ imageUrl });
  } catch (error) {
    console.error('Image upload error:', error);
    return Response.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
} 