import axios from 'axios';

export const getSongs = async (term = '', offset = 0, limit = 10) => {
  try {
    const res = await axios.get(`https://itunes.apple.com/search/?term=${term}&offset=${offset}&limit=${limit}`);
    return res.data.results;
  } catch (err) {
    return [];
  }
};
