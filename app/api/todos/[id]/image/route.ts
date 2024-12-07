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
    
    if (!image) {
      return Response.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }
    
    // 임시로 이미지 URL을 반환
    const imageUrl = '/temp-image-url';  // 실제 업로드된 이미지 URL로 교체 필요

    // Todo 문서 업데이트
    const updatedTodo = await Todo.findByIdAndUpdate(
      params.id,
      { $set: { imageUrl } },
      { new: true }
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