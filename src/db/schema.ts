import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  image: varchar({ length: 255 })
    .notNull()
    .default('https://i.pravatar.cc/150'),
  createdAt: timestamp('create_at', { withTimezone: true }).defaultNow(),
});
