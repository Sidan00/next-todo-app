// Todo 아이템 타입 정의
export interface TodoItem {
  _id: string;
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

// Todo 생성 DTO
export interface CreateTodoDto {
  name: string;
}

// Todo 수정 DTO
export interface UpdateTodoDto {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}
