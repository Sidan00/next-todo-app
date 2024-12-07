import { todoApi } from '@/app/lib/api';
import TodoDetail from './TodoDetail';

interface Props {
  params: {
    _id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params }: Props) {
  console.log('Item ID:', params._id);

  if (!params._id) {
    console.error('No ID provided');
    return <div>Item not found</div>;
  }

  try {
    const item = await todoApi.getItem(String(params._id));
    console.log('Loaded item:', item);

    return (
      <div className="container mx-auto px-4 py-8">
        <TodoDetail _id={String(params._id)} />
      </div>
    );
  } catch (error) {
    console.error('Failed to load item:', error);
    return <div>Item not found</div>;
  }
}