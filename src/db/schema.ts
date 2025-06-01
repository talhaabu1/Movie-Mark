import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const statusEnum = pgEnum('status', [
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
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const movieTable = pgTable('movie', {
  id: integer('id').primaryKey().notNull().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  part: integer('part').notNull(),
  status: statusEnum('status').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const seriesTable = pgTable('series', {
  id: integer('id').primaryKey().notNull().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  season: integer('season').notNull(),
  episode: integer('episode').notNull(),
  status: statusEnum('status').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  movies: many(movieTable),
  series: many(seriesTable),
}));

export const movieRelations = relations(movieTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [movieTable.userId],
    references: [usersTable.id],
  }),
}));

export const seriesRelations = relations(seriesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [seriesTable.userId],
    references: [usersTable.id],
  }),
}));
