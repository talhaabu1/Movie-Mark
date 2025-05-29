ALTER TABLE "users" DROP CONSTRAINT "users_name_unique";--> statement-breakpoint
ALTER TABLE "movie" ADD CONSTRAINT "movie_name_unique" UNIQUE("name");