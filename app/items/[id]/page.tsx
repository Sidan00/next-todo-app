import TodoDetail from './TodoDetail';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page(props: Props) {
  return <TodoDetail id={props.params.id} />;
}
