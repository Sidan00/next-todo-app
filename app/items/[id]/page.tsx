import TodoDetail from './TodoDetail';

interface PageProps {
  params: Promise<{ _id: string }>;
}

export default async function Page(params: PageProps) {
  const { _id } = await params.params;
  return (
    <div className="container mx-auto px-4">
      <TodoDetail _id={_id} />
    </div>
  );
}