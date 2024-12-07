import axios from 'axios';
import { CreateTodoDto, UpdateTodoDto, TodoItem } from '../types/todo';

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// API URL 구성을 로깅하여 확인
console.log('API Configuration:', {
  TENANT_ID,
  BASE_URL,
  formattedUrl: `${BASE_URL}/todos`,
});

export const todoApi = {
  getItems: async (): Promise<TodoItem[]> => {
    const response = await axios.get(`${BASE_URL}/todos`);
    return response.data;
  },

  createItem: async (data: CreateTodoDto): Promise<TodoItem> => {
    const response = await axios.post(`${BASE_URL}/todos`, data);
    return response.data;
  },

  getItem: async (id: string): Promise<TodoItem> => {
    const response = await axios.get(`${BASE_URL}/todos/${id}`);
    return response.data;
  },

  updateItem: async (id: string, data: UpdateTodoDto): Promise<TodoItem> => {
    const response = await axios.patch(`${BASE_URL}/todos/${id}`, data);
    return response.data;
  },

  deleteItem: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/todos/${id}`);
  },

  uploadImage: async (id: string, formData: FormData): Promise<string> => {
    const response = await axios.post(`${BASE_URL}/todos/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.imageUrl;
  },
};