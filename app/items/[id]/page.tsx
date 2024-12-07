import TodoDetailPage from './TodoDetailPage';

export default function Page({ params }: { params: { id: string } }) {
  return <TodoDetailPage params={params} />;
}
