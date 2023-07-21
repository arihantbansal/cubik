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
