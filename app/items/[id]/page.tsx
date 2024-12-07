import { todoApi } from '@/app/lib/api';
import TodoDetail from './TodoDetail';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  console.log('Item ID:', params.id);

  try {
    const item = await todoApi.getItem(params.id);
    console.log('Loaded item:', item);

    return (
      <div className="container mx-auto px-4 py-8">
        <TodoDetail _id={params.id} />
      </div>
    );
  } catch (error) {
    console.error('Failed to load item:', error);
    return <div>Item not found</div>;
  }
}