import axios from 'axios';
import { CreateTodoDto, UpdateTodoDto, TodoItem } from '../types/todo';

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log('API Configuration:', {
  TENANT_ID,
  BASE_URL,
  formattedUrl: `${BASE_URL}/${TENANT_ID}/items`,
});

// id를 _id로 변환하는 헬퍼 함수
const transformItem = (item: any): TodoItem => ({
  ...item,
  _id: item.id,
});

export const todoApi = {
  getItems: async (): Promise<TodoItem[]> => {
    const response = await axios.get(`${BASE_URL}/${TENANT_ID}/items`);
    return response.data.map(transformItem);
  },

  createItem: async (data: CreateTodoDto): Promise<TodoItem> => {
    const response = await axios.post(`${BASE_URL}/${TENANT_ID}/items`, data);
    return transformItem(response.data);
  },

  getItem: async (_id: string): Promise<TodoItem> => {
    const response = await axios.get(`${BASE_URL}/${TENANT_ID}/items/${_id}`);
    return transformItem(response.data);
  },

  updateItem: async (_id: string, data: UpdateTodoDto): Promise<TodoItem> => {
    const response = await axios.patch(`${BASE_URL}/${TENANT_ID}/items/${_id}`, data);
    return transformItem(response.data);
  },

  deleteItem: async (_id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${TENANT_ID}/items/${_id}`);
  },

  uploadImage: async (_id: string, formData: FormData): Promise<string> => {
    const response = await axios.post(`${BASE_URL}/${TENANT_ID}/items/${_id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.imageUrl;
  },
};