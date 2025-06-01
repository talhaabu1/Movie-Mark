import { statusEnum } from '@/db/schema';

export const statusList = statusEnum.enumValues;

export type Status = (typeof statusList)[number];

export function isValidStatus(status: string): status is Status {
  return statusList.includes(status as Status);
}
