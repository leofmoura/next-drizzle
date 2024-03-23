import Image from "next/image";

import { getData } from "@/actions/todo.actions";
import Todos from "@/components/todos";

export default async function Home() {
  const data = await getData();
  return <Todos todos={data} />;
}
