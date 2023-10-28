import axios from 'axios';
import type { TokenPriceResponse } from 'types';

export const tokenPrice = async (token: string) => {
  try {
    const response = await axios.get<TokenPriceResponse>(
      `https://price.jup.ag/v4/price?ids=${token}`,
    );
    const price = response.data.data[token].price;
    return price;
  } catch (error) {
    console.error(error);
    return null;
  }
};
