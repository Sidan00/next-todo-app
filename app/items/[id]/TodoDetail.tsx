'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { todoApi } from '@/app/lib/api';
import { TodoItem, UpdateTodoDto } from '@/app/types/todo';
import Button from '@/app/components/ui/Button';
import ImageUpload from '@/app/components/todo/ImageUpload';
import { uploadToS3 } from '@/app/lib/s3';

export default function TodoDetail({ _id }: { _id: string }) {
  const router = useRouter();
  const [item, setItem] = useState<TodoItem | null>(null);
  const [formData, setFormData] = useState<UpdateTodoDto>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        setIsLoading(true);
        const data = await todoApi.getItem(_id);
        setItem(data);
        setFormData(data);
      } catch (error) {
        console.error('Failed to load item:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };
    loadItem();
  }, [_id, router]);

  const handleImageSelect = (file: File) => {
    setError(null);
    setSelectedImage(file);
  };

  const handleImageError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleUpdate = async () => {
    if (!item || isLoading) return;
    try {
      setIsLoading(true);
      
      let imageUrl = formData.imageUrl;
      
      if (selectedImage) {
        imageUrl = await uploadToS3(selectedImage, item.imageUrl);
      }

      const updatedItem = await todoApi.updateItem(item._id, {
        ...formData,
        imageUrl,
      });

      setItem(updatedItem);
      router.push('/');
    } catch (error) {
      console.error('Failed to update item:', error);
      alert('수정에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!item || isLoading) return;
    if (!confirm('정말로 삭제하시겠습니까?')) return;
    
    try {
      setIsLoading(true);
      await todoApi.deleteItem(item._id);
      router.push('/');
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('삭제에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="todo-detail-container">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className={`py-2 px-4 rounded-full border border-slate-900 mb-8
        ${formData.isCompleted ? 'bg-violet-100' : 'bg-white'}`}>
        <div className="w-full flex items-center justify-center gap-3">
          <button 
            onClick={() => setFormData({ ...formData, isCompleted: !formData.isCompleted })}
            className="w-8 h-8 flex items-center justify-center"
          >
            <img 
              src={formData.isCompleted ? '/images/Property%201%3DFrame.svg' : '/images/Property%201%3DDefault.svg'} 
              alt="체크박스" 
              width={32}
              height={32}
            />
          </button>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="할 일을 입력하세요"
            className="bg-transparent border-none outline-none font-bold underline text-center w-auto"
          />
        </div>
      </div>
      
      <div className="content-container">
        <div className="flex-1 bg-white rounded-lg">
          <ImageUpload
            currentImageUrl={formData.imageUrl}
            onImageSelect={handleImageSelect}
            onError={handleImageError}
          />
        </div>
        
        <div className="flex-1 bg-white rounded-lg">
          <div className="memo-section h-full">
            <div className="memo-header">Memo</div>
            <textarea
              value={formData.memo || ''}
              onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
              className="memo-textarea"
              placeholder="메모를 입력하세요"
            />
          </div>
        </div>
      </div>

      <div className="button-container">
        <Button 
          onClick={handleUpdate} 
          variant="complete"
          disabled={isLoading}
        >
          {isLoading ? '저장 중...' : '✓ 수정 완료'}
        </Button>
        <Button 
          onClick={handleDelete}
          variant="delete"
          disabled={isLoading}
        >
          ✕ 삭제하기
        </Button>
      </div>
    </div>
  );
} 