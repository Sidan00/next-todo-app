import mongoose, { Schema, Document } from 'mongoose';

interface ITodo extends Document {
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

const TodoSchema: Schema = new Schema({
  tenantId: { type: String, required: true },
  name: { type: String, required: true },
  memo: { type: String },
  imageUrl: { type: String },
  isCompleted: { type: Boolean, default: false },
});

export default mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema); 