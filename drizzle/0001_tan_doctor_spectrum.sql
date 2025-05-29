ALTER TABLE "movie" DROP CONSTRAINT "movie_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "movie" ADD CONSTRAINT "movie_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_name_unique" UNIQUE("name");