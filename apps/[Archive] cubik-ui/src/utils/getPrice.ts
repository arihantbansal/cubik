import axios from "axios";
import { PriceReturnType } from "~/types/token";

export const fetchPrice = async (
  type: ("solana" | "bonk")[]
): Promise<PriceReturnType[]> => {
  try {
    const { data } = await axios.post("/api/info/price", {
      tokens: type || [],
    });

    return data.prices;
  } catch (error) {
    return [];
  }
};
