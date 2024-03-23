import Image from "next/image";

import { getData } from "@/actions/todo.actions";
import Todos from "@/components/todos";
export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getData();
  return <Todos todos={data} />;
}
