import api from './baseUrl';

export const profileGet = async () => {
  try {
    const res = await api.get('/profile');
    return res.data;
  } catch (err) {
    throw err;
  }
};
