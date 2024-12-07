'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { validateImage } from '@/app/lib/imageValidation';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageSelect: (file: File) => void;
  onError: (error: string) => void;
}

export default function ImageUpload({ 
  currentImageUrl, 
  onImageSelect,
  onError
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateImage(file);
      
      if (!validation.isValid) {
        onError(validation.error!);
        // 파일 입력 초기화
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // 미리보기 URL 생성
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      onImageSelect(file);

      // 이전 미리보기 URL 정리
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const displayUrl = previewUrl || currentImageUrl;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full aspect-[4/3] max-w-4xl">
        {displayUrl ? (
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={displayUrl}
              alt="Todo image"
              fill
              className="object-contain bg-gray-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            />
          </div>
        ) : (
          <div className="w-full h-full border-2 border-dashed border-gray-300 bg-slate-50 rounded-lg flex items-center justify-center">
            <Image 
              src="/images/img.svg"
              alt="기본 이미지"
              width={64}
              height={64}
            />
          </div>
        )}
        
        {/* 우측 하단 버튼 - displayUrl 값에 따라 다른 아이콘 표시 */}
        <button
          onClick={handleClick}
          className="absolute bottom-4 right-4 z-10"
        >
          <Image 
            src={displayUrl ? "/images/Type=Edit.svg" : "/images/Type=Plus.svg"}
            alt={displayUrl ? "이미지 수정" : "이미지 추가"}
            width={48}
            height={48}
          />
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
} 