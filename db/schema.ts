import { relations } from "drizzle-orm";
import {
  integer,
  text,
  boolean,
  pgTable,
  uuid,
  date,
} from "drizzle-orm/pg-core";
import { InferResultType } from "./utils";

export const todo = pgTable("todo", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});

export const todoRelations = relations(todo, ({ many }) => ({
  remarks: many(remarks),
}));

export const remarks = pgTable("remark", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  createdAt: date("creation").defaultNow(),
  todoId: uuid("todo_id").references(() => todo.id, { onDelete: "cascade" }),
});

export const remarksRelations = relations(remarks, ({ one }) => ({
  author: one(todo, { fields: [remarks.todoId], references: [todo.id] }),
}));

export type TodoWithRemarksType = InferResultType<"todo", { remarks: true }>;
export type RemarksType = InferResultType<"remarks">;
