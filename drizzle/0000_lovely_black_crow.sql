CREATE TYPE "public"."movie_status" AS ENUM('WATCHED', 'WATCHING', 'PLAN TO WATCH', 'COMING SOON');--> statement-breakpoint
CREATE TABLE "movie" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "movie_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"part" integer NOT NULL,
	"status" "movie_status" NOT NULL,
	"user_id" integer NOT NULL,
	"create_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"image" varchar(255) DEFAULT 'https://i.pravatar.cc/150' NOT NULL,
	"create_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "movie" ADD CONSTRAINT "movie_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;