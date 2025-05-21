import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const movieStatusEnum = pgEnum('movie_status', [
  'WATCHED',
  'WATCHING',
  'PLAN TO WATCH',
  'COMING SOON',
]);

export const usersTable = pgTable('users', {
  id: integer('id').primaryKey().notNull().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  image: varchar('image', { length: 255 })
    .notNull()
    .default('https://i.pravatar.cc/150'),
  createdAt: timestamp('create_at', { withTimezone: true }).defaultNow(),
});

export const movieTable = pgTable('movie', {
  id: integer('id').primaryKey().notNull().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  part: integer('part').notNull(),
  status: movieStatusEnum('status').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp('create_at', { withTimezone: true }).defaultNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  movies: many(movieTable),
}));

export const movieRelations = relations(movieTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [movieTable.userId],
    references: [usersTable.id],
  }),
}));
