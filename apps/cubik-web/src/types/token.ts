export interface TokenInfo {
  tokenAccount?: string;
  mint: string;
  amount: number;
  symbol: string;
  decimals: number;
  address?: string;
  name?: string;
}

export interface TokenPriceResponse {
  data: Record<
    string,
    {
      id: string;
      mintSymbol: string;
      vsToken: string;
      vsTokenSymbol: string;
      price: number;
    }
  >;
  timeTaken: number;
}
export interface BalanceDataType {
  tokens: {
    tokenAccount: string;
    mint: string;
    amount: number;
    decimals: number;
  }[];
  nativeBalance: number;
}
export interface PriceReturnType {
  token: string;
  price: number;
}
