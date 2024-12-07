import axios from 'axios';
import { CreateTodoDto, UpdateTodoDto, TodoItem } from '../types/todo';

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;
if (!TENANT_ID) {
  throw new Error('NEXT_PUBLIC_TENANT_ID is not defined');
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

console.log('API Configuration:', {
  originalUrl: BASE_URL,
  formattedUrl: api.defaults.baseURL,
  fullUrl: `${api.defaults.baseURL}/${TENANT_ID}/items`,
  TENANT_ID
});

export const todoApi = {
  getItems: async (): Promise<TodoItem[]> => {
    try {
      const response = await api.get(`/${TENANT_ID}/items`);
      return response.data.map((item: any) => ({
        ...item,
        _id: item.id,
      }));
    } catch (error) {
      console.error('Get items error:', error);
      throw error;
    }
  },
  createItem: async (data: CreateTodoDto): Promise<TodoItem> => {
    try {
      const response = await api.post(`/${TENANT_ID}/items`, data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getItem: async (id: string): Promise<TodoItem> => {
    try {
      const response = await api.get(`/${TENANT_ID}/items/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get item error:', error);
      throw error;
    }
  },
  updateItem: async (id: string, data: UpdateTodoDto): Promise<TodoItem> => {
    try {
      const response = await api.patch(`/${TENANT_ID}/items/${id}`, data);
      return {
        ...response.data,
        _id: response.data.id
      };
    } catch (error) {
      console.error('Update item error:', error);
      throw error;
    }
  },
  deleteItem: async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
  },
  uploadImage: async (id: string, formData: FormData): Promise<string> => {
    const response = await api.post(`/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.imageUrl;
  },
};