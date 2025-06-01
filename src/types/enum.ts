import { statusEnum } from '@/db/schema';

export const statusList = statusEnum.enumValues;

export type MovieStatus = (typeof statusList)[number];

export function isValidStatus(status: string): status is MovieStatus {
  return statusList.includes(status as MovieStatus);
}
