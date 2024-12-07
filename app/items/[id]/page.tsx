import TodoDetailPage from './TodoDetailPage';

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page(props: Props) {
  return <TodoDetailPage params={props.params} />;
}
