"use server";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import {
  remarks as remarksSchema,
  TodoWithRemarksType,
  todo,
  RemarksType,
} from "@/db/schema";
import { db } from "@/db/drizzle";

export type GetDataType = Awaited<ReturnType<typeof getData>>;
export const getData = async () => {
  const raw = await db
    .select({
      id: todo.id,
      text: todo.text,
      done: todo.done,
      totalRemarks: sql<number>`cast(count(${remarksSchema.id}) as int)`,
    })
    .from(todo)
    .leftJoin(remarksSchema, eq(todo.id, remarksSchema.todoId))
    .groupBy(todo.id, todo.text, todo.done);

  return raw;
};

export const addTodo = async (text: string, remarks: string[]) => {
  let id = "";
  await db.transaction(async (tx) => {
    const newTodo = await tx
      .insert(todo)
      .values({
        text,
      })
      .returning({ id: todo.id });
    console.info("new todo info", newTodo);
    await tx.insert(remarksSchema).values(
      remarks.map((r) => {
        return { content: r, todoId: newTodo[0].id } as RemarksType;
      })
    );
    id = newTodo[0].id;
    revalidatePath("/");
  });

  return id;
};

export const deleteTodo = async (id: string) => {
  await db.delete(todo).where(eq(todo.id, id));

  revalidatePath("/");
};

export const toggleTodo = async (id: string, done: boolean) => {
  await db
    .update(todo)
    .set({
      done: done,
    })
    .where(eq(todo.id, id));
  revalidatePath("/");
};

export const editTodo = async (id: string, text: string) => {
  await db
    .update(todo)
    .set({
      text: text,
    })
    .where(eq(todo.id, id));

  revalidatePath("/");
};
