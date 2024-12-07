export async function uploadToS3(file: File, oldImageUrl?: string): Promise<string> {
  try {
    console.log('Starting upload for file:', file.name);
    const formData = new FormData();
    formData.append('file', file);
    if (oldImageUrl) {
      formData.append('oldImageUrl', oldImageUrl);
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    console.log('Upload response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Upload response error:', errorData);
      throw new Error(errorData.error || 'Upload failed');
    }

    const data = await response.json();
    console.log('Upload successful, received URL:', data.imageUrl);
    return data.imageUrl;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
  }
}