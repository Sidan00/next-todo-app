'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface TodoFormProps {
  onSubmit: (name: string) => void; // 할 일 추가 함수
  itemCount: number; // 할 일 개수
}

// 할 일 추가 폼 컴포넌트
export default function TodoForm({ onSubmit }: TodoFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지
    if (name.trim()) {  // 빈 문자열이 아닐 때만 처리
      onSubmit(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="flex-1 py-2 px-4 rounded-full bg-slate-100 border border-slate-900">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="할 일을 입력해주세요"
          className="w-full border-none bg-slate-100 outline-none"
        />
      </div>
      <button 
        type="submit" 
        className="py-2 px-4 bg-slate-200 text-slate-900 rounded-full font-medium border border-slate-900 
        shadow-[2px_2px_0px_#0f172a]"
      >
        <span className="block sm:hidden">+</span>
        <span className="hidden sm:block">+ 추가하기</span>
      </button>
    </form>
  );
}
