import { NextRequest } from 'next/server';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// S3 URL에서 키 추출
function getKeyFromUrl(url: string): string {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;
    const oldImageUrl = formData.get('oldImageUrl') as string;
    
    // 이전 이미지가 있다면 삭제
    if (oldImageUrl) {
      try {
        const oldKey = getKeyFromUrl(oldImageUrl);
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET || '',
            Key: oldKey,
          })
        );
        console.log('Old image deleted:', oldKey);
      } catch (deleteError) {
        console.error('Failed to delete old image:', deleteError);
      }
    }

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.type.split('/')[1];
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || '',
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
    );
    
    const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    
    return Response.json({ imageUrl });
  } catch (error) {
    console.error('Upload error details:', error);
    return Response.json(
      { 
        error: 'Upload failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const formData = await request.formData();
    const oldImageUrl = formData.get('oldImageUrl') as string;
    
    if (!oldImageUrl) {
      return Response.json({ error: 'No image URL provided' }, { status: 400 });
    }

    const oldKey = getKeyFromUrl(oldImageUrl);
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || '',
        Key: oldKey,
      })
    );

    console.log('Image deleted:', oldKey);
    return Response.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error details:', error);
    return Response.json(
      { 
        error: 'Delete failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
} 