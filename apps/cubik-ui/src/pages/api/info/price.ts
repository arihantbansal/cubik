import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { TokenPriceResponse } from '~/types/token';

export const tokenPrice = async (token: string) => {
  try {
    const response = await axios.get<TokenPriceResponse>(
      `https://price.jup.ag/v4/price?ids=${token}`
    );
    const price = response.data.data[token].price;
    return price;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tokens = req.body.tokens as string[];

    const prices = await Promise.all(
      tokens.map(async (token: string) => {
        const price = await tokenPrice(token);
        return { token: token, price: parseFloat(price?.toFixed(3) || '0.0') };
      })
    );

    res.status(200).json({ prices: prices });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
}
