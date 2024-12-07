import axios from 'axios';
import { CreateTodoDto, UpdateTodoDto, TodoItem } from '../types/todo';

const api = axios.create({ // API 요청 생성
  baseURL: '/api/todos',
});

export const todoApi = {
  getItems: async (): Promise<TodoItem[]> => { // 할 일 목록 조회
    try {
      const response = await api.get('/');
      console.log('API response:', response.data); // 응답 데이터 확인
      return response.data;
    } catch (error) {
      console.error('Get items error:', error);
      throw error;
    }
  },
  createItem: async (data: CreateTodoDto): Promise<TodoItem> => { // 할 일 생성
    try {
      const response = await api.post('/', data);
      return response.data;
    } catch (error) {
      console.error('API error:', error); // 에러 로깅 추가
      throw error;
    }
  },
  getItem: async (id: string): Promise<TodoItem> => { // 할 일 상세 조회
    const response = await api.get(`/${id}`);
    return response.data;
  },
  updateItem: async (id: string, data: UpdateTodoDto): Promise<TodoItem> => { // 할 일 수정 
    const response = await api.patch(`/${id}`, data);
    return response.data;
  },
  deleteItem: async (id: string): Promise<void> => { // 할 일 삭제
    await api.delete(`/${id}`);
  },
  uploadImage: async (id: string, formData: FormData): Promise<string> => { // 이미지 업로드  
    const response = await api.post(`/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.imageUrl;
  },
};