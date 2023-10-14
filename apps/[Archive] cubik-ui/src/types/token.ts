export type TokenPriceResponse = {
  data: {
    [key: string]: {
      id: string;
      mintSymbol: string;
      vsToken: string;
      vsTokenSymbol: string;
      price: number;
    };
  };
  timeTaken: number;
};
export interface BalanceDataType {
  tokens: Array<{
    tokenAccount: string;
    mint: string;
    amount: number;
    decimals: number;
  }>;
  nativeBalance: number;
}
export interface PriceReturnType {
  token: string;
  price: number;
}
