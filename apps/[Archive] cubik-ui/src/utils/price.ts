import axios from "axios";
import { TokenPriceResponse } from "~/types/token";

export const tokenPrice = async (token: string) => {
  try {
    const response = await axios.get<TokenPriceResponse>(
      `https://price.jup.ag/v4/price?ids=SOL`
    );
    const price = response.data.data["SOL"].price;
    return price;
  } catch (error) {
    console.error(error);
    return null;
  }
};
