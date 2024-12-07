import TodoDetail from './TodoDetail';

export default async function Page({ params }: { params: { id: string } }) {
  return <TodoDetail id={params.id} />;
}
