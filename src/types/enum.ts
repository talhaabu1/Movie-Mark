import { movieStatusEnum } from '@/db/schema';

export const movieStatusList = movieStatusEnum.enumValues;

export type MovieStatus = (typeof movieStatusList)[number];

export function isValidMovieStatus(status: string): status is MovieStatus {
  return movieStatusList.includes(status as MovieStatus);
}
