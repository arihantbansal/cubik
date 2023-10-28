import type { Request, Response } from 'express';
import { tokenPrice } from 'utils/price';

export const tokenPriceController = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    const price = await tokenPrice(token);

    res.status(200).json({ price: parseFloat(price?.toFixed(3) || '0.0') });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
export const tokenPriceMultiple = async (req: Request, res: Response) => {
  try {
    const tokens = req.body.tokens as string[];

    const prices = await Promise.all(
      tokens.map(async (token: string) => {
        const price = await tokenPrice(token);
        return { token: token, price: parseFloat(price?.toFixed(3) || '0.0') };
      }),
    );

    res.status(200).json({ prices: prices });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
