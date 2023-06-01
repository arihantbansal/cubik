import axios from 'axios';

export const fetchPrice = async (
  type: 'solana' | 'usd' | 'bonk'
): Promise<number | null> => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${type}&vs_currencies=usd`
    );

    return data[type];
  } catch (error) {
    return null;
  }
};
