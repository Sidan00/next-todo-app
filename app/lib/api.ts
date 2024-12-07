import axios from 'axios';
import { CreateTodoDto, UpdateTodoDto, TodoItem } from '../types/todo';

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const todoApi = {
  getItems: async (): Promise<TodoItem[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/${TENANT_ID}/items`);
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
      const response = await axios.post(`${BASE_URL}/${TENANT_ID}/items`, data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getItem: async (id: string): Promise<TodoItem> => {
    try {
      const response = await axios.get(`${BASE_URL}/${TENANT_ID}/items/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get item error:', error);
      throw error;
    }
  },
  updateItem: async (id: string, data: UpdateTodoDto): Promise<TodoItem> => {
    try {
      const response = await axios.patch(`${BASE_URL}/${TENANT_ID}/items/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update item error:', error);
      throw error;
    }
  },
  deleteItem: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${TENANT_ID}/items/${id}`);
  },
  uploadImage: async (id: string, formData: FormData): Promise<string> => {
    const response = await axios.post(`${BASE_URL}/${TENANT_ID}/items/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.imageUrl;
  },
};