import api from './baseUrl';

export type MovieData = {
  name: string;
  part: number;
  status: string;
  userId: number;
};

export const moviePost = async (movie: MovieData) => {
  try {
    const res = await api.post('/movie', movie);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const movieGet = async () => {
  try {
    const res = await api.get('/movie');
    return res.data;
  } catch (err) {
    throw err;
  }
};
