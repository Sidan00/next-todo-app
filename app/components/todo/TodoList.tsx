'use client';

import React from 'react';
import { TodoItem } from '@/app/types/todo';
import Link from 'next/link';
import Image from 'next/image';

interface TodoListProps {
  items: TodoItem[];
  onToggleComplete: (item: TodoItem) => void;
  type: 'todo' | 'done';
  isLoading: boolean;
}

export default function TodoList({ items, onToggleComplete, type, isLoading }: TodoListProps) {
  if (isLoading) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        {/* 이미지를 감싸는 div에 고정 높이 추가 */}
        <div className="h-[300px] flex items-center justify-center">
          {/* 데스크탑용 이미지 */}
          <Image
            src={`/images/type-${type === 'todo' ? 'todo' : 'done'}-large.svg`}
            alt={type === 'todo' ? '할 일이 없습니다' : '완료된 일이 없습니다'}
            width={300}
            height={300}
            className="hidden md:block"
          />
          {/* 모바일용 이미지 */}
          <Image
            src={`/images/Type=${type === 'todo' ? 'Todo' : 'Done'}, Size=Small.svg`}
            alt={type === 'todo' ? '할 일이 없습니다' : '완료된 일이 없습니다'}
            width={200}
            height={200}
            className="block md:hidden"
          />
        </div>
        <p className="mt-4 text-gray-500 text-center">
          {type === 'todo' 
            ? <>할 일이 없어요.<br />TODO를 새롭게 추가해주세요!</> 
            : <>아직 다 한 일이 없어요.<br />해야 할 일을 체크해보세요!</>}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map(item => (
        <li key={item._id} className={`p-4 rounded-full border border-slate-900 hover:shadow-md transition-shadow
          ${item.isCompleted ? 'bg-violet-100' : 'bg-white'}`}>
          <div className="w-full flex items-center gap-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete(item);
              }}
              className="w-8 h-8 flex items-center justify-center"
            >
              <img 
                src={item.isCompleted ? '/images/Property%201%3DFrame.svg' : '/images/Property%201%3DDefault.svg'} 
                alt="체크박스" 
                width={32}
                height={32}
              />
            </button>
            <Link 
              href={`/items/${item._id}`}
              className={`flex-1 ${item.isCompleted ? 'line-through text-gray-500' : ''}`}
            >
              {item.name}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
