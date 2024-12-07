'use client';

import React, { useEffect, useState } from 'react';
import { todoApi } from './lib/api';
import { TodoItem } from './types/todo';
import TodoList from './components/todo/TodoList';
import TodoForm from './components/todo/TodoForm';

export default function Home() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setIsLoading(true);
        const data = await todoApi.getItems();
        setItems(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadItems();
  }, []);

  const handleAddItem = async (name: string) => {
    const newItem = await todoApi.createItem({ name });
    setItems([...items, newItem]);
  };

  const handleToggleComplete = async (item: TodoItem) => {
    const updatedItem = await todoApi.updateItem(item._id, {
      isCompleted: !item.isCompleted,
    });
    setItems(items.map(i => (i._id === item._id ? updatedItem : i)));
  };

  return (
    <main className="w-full bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <TodoForm 
            onSubmit={handleAddItem} 
            itemCount={items.length}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="mb-4">
              <img 
                src="/images/todo.svg" 
                alt="TO DO" 
                className="inline-block"
              />
            </div>
            <TodoList 
              items={items.filter(item => !item.isCompleted)} 
              onToggleComplete={handleToggleComplete}
              type="todo"
              isLoading={isLoading}
            />
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <img 
                src="/images/done.svg" 
                alt="DONE" 
                className="inline-block"
              />
            </div>
            <TodoList 
              items={items.filter(item => item.isCompleted)} 
              onToggleComplete={handleToggleComplete}
              type="done"
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
