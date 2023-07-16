export type Token = {
  address: string;
  chainId: number;
  decimals: number;
  name: string;
  symbol: string;
  logoURI: string;
  tags: string[];
  extensions: {
    coingeckoId: string;
  };
};

export type TokenPriceResponse = {
  data: {
    [key: string]: {
      id: 'So11111111111111111111111111111111111111112';
      mintSymbol: 'SOL';
      vsToken: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
      vsTokenSymbol: 'USDC';
      price: 27.794443666;
    };
  };
  timeTaken: 0.00037357999985943025;
};
