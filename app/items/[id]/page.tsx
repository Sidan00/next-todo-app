import TodoDetail from './TodoDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(params: PageProps) {
  const { id } = await params.params;
  return (
    <div className="container mx-auto px-4">
      <TodoDetail id={id} />
    </div>
  );
}