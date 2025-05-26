import api from './baseUrl';

type MovieGetType = {
  status: string;
  userId: number;
  page?: number;
  limit?: number;
  search?: string;
};

export type MovieDataType = {
  name: string;
  part: number;
  status: string;
  userId: number;
};

export const moviePost = async (movie: MovieDataType) => {
  try {
    const res = await api.post('/movie', movie);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const movieGet = async ({
  userId,
  status,
  page,
  limit,
  search,
}: MovieGetType) => {
  try {
    const res = await api.get('/movie', {
      params: {
        userId,
        status,
        page,
        limit,
        search,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const movieSearch = async ({
  search,
  userId,
}: Pick<MovieGetType, 'search' | 'userId'>) => {
  try {
    const res = await api.get('/movie/search', {
      params: {
        search,
        userId,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
