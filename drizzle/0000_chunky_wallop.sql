CREATE TABLE IF NOT EXISTS "remark" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"todo_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "remark" ADD CONSTRAINT "remark_todo_id_todo_id_fk" FOREIGN KEY ("todo_id") REFERENCES "todo"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
