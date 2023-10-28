import axios from 'axios';

import type { Token } from '../types';

export const getTokens = async () => {
  try {
    const response = await axios.get<Token>('https://token.jup.ag/all');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
