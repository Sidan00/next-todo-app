import { todoApi } from '@/app/lib/api';
import TodoDetail from './TodoDetail';

interface Props {
  params: Promise<{ _id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: Props) {
  const { _id } = await params;
  console.log('Item ID:', _id);

  if (!_id) {
    console.error('No ID provided');
    return <div>Item not found</div>;
  }

  try {
    const item = await todoApi.getItem(String(_id));
    console.log('Loaded item:', item);

    return (
      <div className="container mx-auto px-4 py-8">
        <TodoDetail _id={String(_id)} />
      </div>
    );
  } catch (error) {
    console.error('Failed to load item:', error);
    return <div>Item not found</div>;
  }
}